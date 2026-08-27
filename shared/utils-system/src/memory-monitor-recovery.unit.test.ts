import { describe, expect, test } from "bun:test"
import { assessRecoveryWindow, GLOBAL_RECOVERY_WINDOW_SEC } from "./memory-monitor/recovery-window"

describe("assessRecoveryWindow", () => {
  const WINDOW_MS = GLOBAL_RECOVERY_WINDOW_SEC * 1000
  const NOW = 1_000_000

  test("global leg clear → no execute, recovered (window reset)", () => {
    const d = assessRecoveryWindow({
      globalTripped: false,
      nowMs: NOW,
      lastGlobalKillAtMs: NOW - 5_000,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(d.execute).toBe(false)
    expect(d.recovered).toBe(true)
  })

  test("tripped with no kill in flight → executes the first kill", () => {
    const d = assessRecoveryWindow({
      globalTripped: true,
      nowMs: NOW,
      lastGlobalKillAtMs: null,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(d.execute).toBe(true)
    expect(d.recovered).toBe(false)
  })

  test("tripped within the recovery window → suppresses escalation (≤1 kill/window)", () => {
    const d = assessRecoveryWindow({
      globalTripped: true,
      nowMs: NOW,
      lastGlobalKillAtMs: NOW - (WINDOW_MS - 1),
      recoveryWindowMs: WINDOW_MS,
    })
    expect(d.execute).toBe(false)
    expect(d.recovered).toBe(false)
    expect(d.reason).toContain("recovery window")
  })

  test("still tripped exactly at the window boundary → escalates (inclusive)", () => {
    const d = assessRecoveryWindow({
      globalTripped: true,
      nowMs: NOW,
      lastGlobalKillAtMs: NOW - WINDOW_MS,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(d.execute).toBe(true)
    expect(d.recovered).toBe(false)
    expect(d.reason).toContain("escalating")
  })

  test("still tripped well past the window → escalates exactly one more", () => {
    const d = assessRecoveryWindow({
      globalTripped: true,
      nowMs: NOW,
      lastGlobalKillAtMs: NOW - WINDOW_MS * 3,
      recoveryWindowMs: WINDOW_MS,
    })
    expect(d.execute).toBe(true)
  })

  test("simulated tick sequence: one pressure event yields at most one kill per window", () => {
    const TICK_MS = 10_000
    let lastGlobalKillAtMs: number | null = null
    let executes = 0
    const firstKillAt = 0
    for (let t = 0; t <= WINDOW_MS * 2; t += TICK_MS) {
      const d = assessRecoveryWindow({
        globalTripped: true,
        nowMs: t,
        lastGlobalKillAtMs,
        recoveryWindowMs: WINDOW_MS,
      })
      if (d.execute) {
        executes += 1
        lastGlobalKillAtMs = t
      }
    }
    expect(executes).toBe(3)
    expect(firstKillAt).toBe(0)
  })
})
