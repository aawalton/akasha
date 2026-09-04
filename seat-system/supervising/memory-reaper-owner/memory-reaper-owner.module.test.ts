import { describe, expect, test } from "bun:test"
import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import {
  MAX_OWNER_HOPS,
  resolveSeatBinding,
  seatBindingInArgv,
} from "./memory-reaper-owner.module.code.ts"

const AGENT = "11111111-2222-3333-4444-555555555555"
const SESSION = "66666666-7777-8888-9999-aaaaaaaaaaaa"

function snap(pid: number, ppid: number): PidSnapshot {
  return { pid, ppid, vmRssKb: 0, pssKb: 0, name: `p${pid}` }
}

describe("seatBindingInArgv", () => {
  test("reads a seat off a separated flag", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", AGENT], 7, 0)).toEqual({
      agentId: AGENT,
      sessionId: null,
      pid: 7,
      hops: 0,
    })
  })

  test("reads a seat off an equals form", () => {
    expect(seatBindingInArgv(["bun", `--agent-id=${AGENT}`], 7, 2)?.agentId).toBe(AGENT)
  })

  test("carries the session where one is named", () => {
    const found = seatBindingInArgv(["bun", "--agent-id", AGENT, "--session-id", SESSION], 7, 0)
    expect(found?.sessionId).toBe(SESSION)
  })

  test("names no seat where the agent id is no uuid", () => {
    expect(seatBindingInArgv(["bun", "--agent-id", "athena"], 7, 0)).toBeNull()
  })

  test("names no seat where the flag stands alone", () => {
    expect(seatBindingInArgv(["bun", "--agent-id"], 7, 0)).toBeNull()
  })
})

describe("resolveSeatBinding", () => {
  const snapshots = [snap(10, 1), snap(11, 10), snap(12, 11)]

  test("walks up to the nearest ancestor naming a seat", () => {
    const found = resolveSeatBinding(12, snapshots, (pid) =>
      pid === 10 ? ["bun", "--agent-id", AGENT] : undefined
    )
    expect(found).toMatchObject({ agentId: AGENT, pid: 10, hops: 2 })
  })

  test("stops at the nearest rather than the topmost", () => {
    const found = resolveSeatBinding(12, snapshots, (pid) =>
      pid === 10 || pid === 11 ? ["bun", "--agent-id", AGENT] : undefined
    )
    expect(found?.pid).toBe(11)
  })

  test("finds nothing where no ancestor names a seat", () => {
    expect(resolveSeatBinding(12, snapshots, () => undefined)).toBeNull()
  })

  test("ends a parent cycle rather than looping", () => {
    const cycle = [snap(10, 11), snap(11, 10)]
    expect(resolveSeatBinding(10, cycle, () => ["bun"])).toBeNull()
  })

  test("gives up at the hop ceiling", () => {
    const chain: PidSnapshot[] = []
    for (let pid = 2; pid <= MAX_OWNER_HOPS + 40; pid += 1) chain.push(snap(pid, pid - 1))
    const top = MAX_OWNER_HOPS + 40
    const found = resolveSeatBinding(top, chain, (pid) =>
      pid === 2 ? ["bun", "--agent-id", AGENT] : undefined
    )
    expect(found).toBeNull()
  })
})
