import { describe, expect, test } from "bun:test"
import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import {
  assessMemoryKill,
  assessTreeKills,
  KB_PER_GB,
  selectTopmostSupervisors,
} from "./memory-reaper-legs.module.code.ts"

function snap(pid: number, ppid: number, gb: number): PidSnapshot {
  return { pid, ppid, vmRssKb: gb * KB_PER_GB, pssKb: gb * KB_PER_GB, name: `p${pid}` }
}

describe("assessMemoryKill", () => {
  test("kills strictly over the ceiling", () => {
    const out = assessMemoryKill({
      rssKb: 33 * KB_PER_GB,
      thresholdKb: 32 * KB_PER_GB,
      kindLabel: "process (bun)",
      pid: 7,
    })
    expect(out.kill).toBe(true)
    expect(out.reason).toContain("pid=7")
  })

  test("spares a process exactly at the ceiling", () => {
    const out = assessMemoryKill({
      rssKb: 32 * KB_PER_GB,
      thresholdKb: 32 * KB_PER_GB,
      kindLabel: "process (bun)",
      pid: 7,
    })
    expect(out.kill).toBe(false)
  })

  test("says why even where it spares", () => {
    const out = assessMemoryKill({
      rssKb: KB_PER_GB,
      thresholdKb: 32 * KB_PER_GB,
      kindLabel: "process (bun)",
      pid: 7,
    })
    expect(out.reason).toContain("1.0 GB")
  })
})

describe("selectTopmostSupervisors", () => {
  test("drops a supervisor standing under another supervisor", () => {
    const snapshots = [snap(10, 1, 1), snap(20, 10, 1)]
    expect(selectTopmostSupervisors([10, 20], snapshots)).toEqual([10])
  })

  test("keeps two supervisors that are no kin", () => {
    const snapshots = [snap(10, 1, 1), snap(20, 1, 1)]
    expect(selectTopmostSupervisors([10, 20], snapshots)).toEqual([10, 20])
  })

  test("ends a parent cycle rather than looping", () => {
    const snapshots = [
      { pid: 10, ppid: 20, vmRssKb: 0, pssKb: 0, name: "a" },
      { pid: 20, ppid: 10, vmRssKb: 0, pssKb: 0, name: "b" },
    ]
    expect(selectTopmostSupervisors([10], snapshots)).toEqual([10])
    expect(selectTopmostSupervisors([10, 20], snapshots)).toEqual([])
  })
})

describe("assessTreeKills", () => {
  test("totals the whole subtree", () => {
    const snapshots = [snap(10, 1, 20), snap(11, 10, 20), snap(12, 11, 20)]
    const [result] = assessTreeKills({
      snapshots,
      supervisorPids: [10],
      perTreeThresholdKb: 32 * KB_PER_GB,
      perProcessKillPids: [],
    })
    expect(result?.treePssKb).toBe(60 * KB_PER_GB)
    expect(result?.descendantPids).toEqual([11, 12])
    expect(result?.decision.kill).toBe(true)
  })

  test("leaves out what a per-process kill already reclaims", () => {
    const snapshots = [snap(10, 1, 20), snap(11, 10, 20), snap(12, 11, 20)]
    const [result] = assessTreeKills({
      snapshots,
      supervisorPids: [10],
      perTreeThresholdKb: 32 * KB_PER_GB,
      perProcessKillPids: [12],
    })
    expect(result?.treePssKb).toBe(40 * KB_PER_GB)
    expect(result?.decision.kill).toBe(true)
  })

  test("spares a tree brought under the ceiling by that reclaim", () => {
    const snapshots = [snap(10, 1, 10), snap(11, 10, 10), snap(12, 11, 20)]
    const [result] = assessTreeKills({
      snapshots,
      supervisorPids: [10],
      perTreeThresholdKb: 32 * KB_PER_GB,
      perProcessKillPids: [12],
    })
    expect(result?.decision.kill).toBe(false)
  })
})
