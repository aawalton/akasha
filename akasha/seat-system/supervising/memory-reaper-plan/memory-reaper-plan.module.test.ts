import { describe, expect, test } from "bun:test"
import { KB_PER_GB } from "../memory-reaper-legs/memory-reaper-legs.module.code.ts"
import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import { planReaperKills, seatsInTree } from "./memory-reaper-plan.module.code.ts"

const SEAT_A = "11111111-2222-3333-4444-555555555555"
const SEAT_B = "66666666-7777-8888-9999-aaaaaaaaaaaa"

function snap(pid: number, ppid: number, gb: number): PidSnapshot {
  return { pid, ppid, vmRssKb: gb * KB_PER_GB, pssKb: gb * KB_PER_GB, name: `p${pid}` }
}

const CEILINGS = {
  perProcessThresholdKb: 32 * KB_PER_GB,
  perTreeThresholdKb: 32 * KB_PER_GB,
  globalTarget: null,
  readArgv: () => undefined,
}

describe("seatsInTree", () => {
  test("gathers each distinct seat once, sorted", () => {
    const seats = seatsInTree([1, 2, 3], (pid) =>
      pid === 3 ? ["bun", "--agent-id", SEAT_A] : ["bun", "--agent-id", SEAT_B]
    )
    expect(seats).toEqual([SEAT_A, SEAT_B].toSorted())
  })
})

describe("planReaperKills", () => {
  test("never plans a kill that would take the reaper itself", () => {
    const plan = planReaperKills({
      snapshots: [snap(99, 1, 40)],
      supervisorPids: [],
      selfPid: 99,
      ...CEILINGS,
    })
    expect(plan.procKills).toEqual([])
  })

  test("refuses a tree that holds the reaper", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 20), snap(99, 10, 20)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
    })
    expect(plan.treeKills[0]?.disposition).toBe("refused-contains-self")
  })

  test("refuses a tree holding more than one seat", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 20), snap(11, 10, 20)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
      readArgv: (pid: number) =>
        pid === 10 ? ["bun", "--agent-id", SEAT_A] : ["bun", "--agent-id", SEAT_B],
    })
    expect(plan.treeKills[0]?.disposition).toBe("refused-spans-seats")
    expect(plan.treeKills[0]?.seats).toHaveLength(2)
  })

  test("signals a tree holding one seat", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 20), snap(11, 10, 20)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
      readArgv: () => ["bun", "--agent-id", SEAT_A],
    })
    expect(plan.treeKills[0]?.disposition).toBe("signalled")
  })

  test("covers a process inside a tree still over its ceiling", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 20), snap(11, 10, 20), snap(12, 11, 40)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
    })
    expect(plan.treeKills[0]).toMatchObject({ rootPid: 10, disposition: "signalled" })
    expect(plan.procKills[0]).toMatchObject({ pid: 12, disposition: "covered-by-tree-kill" })
  })

  test("spares a tree the per-process kills bring under the ceiling", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 5), snap(11, 10, 40)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
    })
    expect(plan.treeKills).toEqual([])
    expect(plan.sparedTrees[0]).toMatchObject({ rootPid: 10, reclaimedPids: [11] })
  })

  test("signals a tree named twice only once", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 20), snap(11, 10, 20)],
      supervisorPids: [10],
      selfPid: 99,
      ...CEILINGS,
      globalTarget: { kind: "tree", rootPid: 10, descendantPids: [11], treePssKb: 40 * KB_PER_GB },
    })
    expect(plan.treeKills.filter((t) => t.disposition === "signalled")).toHaveLength(1)
    expect(plan.treeKills.some((t) => t.disposition === "already-planned")).toBe(true)
  })

  test("carries a host-global process target into the plan", () => {
    const plan = planReaperKills({
      snapshots: [snap(10, 1, 1)],
      supervisorPids: [],
      selfPid: 99,
      ...CEILINGS,
      globalTarget: { kind: "pid", pid: 10, vmRssKb: KB_PER_GB, name: "p10" },
    })
    expect(plan.procKills[0]).toMatchObject({ pid: 10, leg: "host-global" })
  })

  test("leaves pid 1 alone", () => {
    const plan = planReaperKills({
      snapshots: [snap(1, 0, 40)],
      supervisorPids: [],
      selfPid: 99,
      ...CEILINGS,
    })
    expect(plan.procKills).toEqual([])
  })
})
