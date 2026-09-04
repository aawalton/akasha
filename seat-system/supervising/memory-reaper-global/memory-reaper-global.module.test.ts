import { describe, expect, test } from "bun:test"
import { KB_PER_GB } from "../memory-reaper-legs/memory-reaper-legs.module.code.ts"
import type { PidSnapshot } from "../memory-reaper-proc-scan/memory-reaper-proc-scan.module.code.ts"
import { assessGlobalKill, assessRecoveryWindow } from "./memory-reaper-global.module.code.ts"

function snap(pid: number, ppid: number, gb: number): PidSnapshot {
  return { pid, ppid, vmRssKb: gb * KB_PER_GB, pssKb: gb * KB_PER_GB, name: `p${pid}` }
}

const TIGHT = {
  availableKb: 2 * KB_PER_GB,
  swapTotalKb: 8 * KB_PER_GB,
  swapFreeKb: KB_PER_GB,
  minAvailKb: 4 * KB_PER_GB,
  minFreeSwapKb: 4 * KB_PER_GB,
}

describe("assessGlobalKill", () => {
  test("holds off while swap still has room", () => {
    const out = assessGlobalKill({
      snapshots: [snap(10, 1, 40)],
      supervisorPids: [10],
      ...TIGHT,
      swapFreeKb: 8 * KB_PER_GB,
    })
    expect(out.kill).toBe(false)
    expect(out.target).toBeNull()
  })

  test("holds off while memory still has headroom", () => {
    const out = assessGlobalKill({
      snapshots: [snap(10, 1, 40)],
      supervisorPids: [10],
      ...TIGHT,
      availableKb: 40 * KB_PER_GB,
    })
    expect(out.kill).toBe(false)
  })

  test("counts a host with no swap as one whose swap is drained", () => {
    const out = assessGlobalKill({
      snapshots: [snap(10, 1, 40)],
      supervisorPids: [10],
      ...TIGHT,
      swapTotalKb: 0,
      swapFreeKb: 0,
    })
    expect(out.kill).toBe(true)
  })

  test("takes the largest supervisor tree", () => {
    const out = assessGlobalKill({
      snapshots: [snap(10, 1, 5), snap(20, 1, 30), snap(21, 20, 5)],
      supervisorPids: [10, 20],
      ...TIGHT,
    })
    expect(out.kill).toBe(true)
    expect(out.target).toEqual({
      kind: "tree",
      rootPid: 20,
      descendantPids: [21],
      treePssKb: 35 * KB_PER_GB,
    })
  })

  test("falls back to the largest single process where no tree stands", () => {
    const out = assessGlobalKill({
      snapshots: [snap(10, 1, 5), snap(11, 1, 30)],
      supervisorPids: [],
      ...TIGHT,
    })
    expect(out.target?.kind).toBe("pid")
    expect(out.target).toMatchObject({ pid: 11 })
  })

  test("says so where it finds nothing to take", () => {
    const out = assessGlobalKill({ snapshots: [], supervisorPids: [], ...TIGHT })
    expect(out.kill).toBe(false)
    expect(out.reason).toContain("no kill target found")
  })
})

describe("assessRecoveryWindow", () => {
  const WINDOW_MS = 60_000

  test("resets the window the moment the leg reads clear", () => {
    const out = assessRecoveryWindow({
      globalTripped: false,
      nowMs: 1000,
      lastGlobalKillAtMs: 500,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(out).toMatchObject({ execute: false, recovered: true })
  })

  test("executes at once where nothing was killed yet", () => {
    const out = assessRecoveryWindow({
      globalTripped: true,
      nowMs: 1000,
      lastGlobalKillAtMs: null,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(out.execute).toBe(true)
  })

  test("suppresses inside the window", () => {
    const out = assessRecoveryWindow({
      globalTripped: true,
      nowMs: 1000,
      lastGlobalKillAtMs: 0,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(out.execute).toBe(false)
    expect(out.reason).toContain("recovery window")
  })

  test("escalates once the window has elapsed", () => {
    const out = assessRecoveryWindow({
      globalTripped: true,
      nowMs: WINDOW_MS + 1,
      lastGlobalKillAtMs: 0,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(out.execute).toBe(true)
    expect(out.recovered).toBe(false)
  })
})
