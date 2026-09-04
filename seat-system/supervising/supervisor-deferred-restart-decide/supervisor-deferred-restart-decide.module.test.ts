import { expect, test } from "bun:test"
import {
  DEFAULT_REEXEC_MAX_DEFER_MS,
  DEFAULT_STALE_WEDGE_MS,
  decideDeferredRestart,
  EDGE_CONNECTION_CLIFF_OVERRIDE_MS,
  IDLE_STREAK_TO_RESTART,
  INITIAL_DEFERRED_RESTART_STATE,
  resolveMaxDeferMs,
  resolvePreCliffOverrideMs,
  resolveStaleWedgeMs,
} from "./supervisor-deferred-restart-decide.module.code.ts"

test("one idle tick short of the streak does not fire", () => {
  const held = decideDeferredRestart(INITIAL_DEFERRED_RESTART_STATE, { idle: true })
  expect(held.fire).toBe(false)
  expect(held.state.idleStreak).toBe(1)
})

test("an idle streak reaching the threshold fires on idle", () => {
  let state = INITIAL_DEFERRED_RESTART_STATE
  let last = decideDeferredRestart(state, { idle: true })
  for (let i = 1; i < IDLE_STREAK_TO_RESTART; i++) {
    state = last.state
    last = decideDeferredRestart(state, { idle: true })
  }
  expect(last.fire).toBe(true)
  expect(last.fireReason).toBe("idle")
})

test("a busy tick clears the idle streak", () => {
  const idled = decideDeferredRestart(INITIAL_DEFERRED_RESTART_STATE, { idle: true })
  const busied = decideDeferredRestart(idled.state, { idle: false, busyReason: "in-flight" })
  expect(busied.state.idleStreak).toBe(0)
  expect(busied.fire).toBe(false)
})

test("a busy session fires only where reason and transcript both repeat", () => {
  const obs = { idle: false, busyReason: "in-flight", transcriptMtimeMs: 1000 }
  const first = decideDeferredRestart(INITIAL_DEFERRED_RESTART_STATE, obs, { staleTicks: 2 })
  expect(first.state.staleStreak).toBe(0)
  const second = decideDeferredRestart(first.state, obs, { staleTicks: 2 })
  expect(second.state.staleStreak).toBe(1)
  const third = decideDeferredRestart(second.state, obs, { staleTicks: 2 })
  expect(third.fire).toBe(true)
  expect(third.fireReason).toBe("stale-wedge")
})

test("a moving transcript is not a wedge however long the reason repeats", () => {
  let held = decideDeferredRestart(
    INITIAL_DEFERRED_RESTART_STATE,
    { idle: false, busyReason: "in-flight", transcriptMtimeMs: 1 },
    { staleTicks: 2 }
  )
  for (let mtime = 2; mtime < 8; mtime++) {
    held = decideDeferredRestart(
      held.state,
      { idle: false, busyReason: "in-flight", transcriptMtimeMs: mtime },
      { staleTicks: 2 }
    )
    expect(held.fire).toBe(false)
  }
})

test("a defer past its ceiling fires however busy the session reads", () => {
  const held = decideDeferredRestart(
    INITIAL_DEFERRED_RESTART_STATE,
    { idle: false, busyReason: "in-flight" },
    { ceilingTicks: 1 }
  )
  expect(held.fire).toBe(true)
  expect(held.fireReason).toBe("ceiling")
})

test("an unreadable window falls back to its default", () => {
  expect(resolveMaxDeferMs(undefined)).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
  expect(resolveMaxDeferMs("  ")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
  expect(resolveMaxDeferMs("-1")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
  expect(resolveMaxDeferMs("nonsense")).toBe(DEFAULT_REEXEC_MAX_DEFER_MS)
  expect(resolveStaleWedgeMs(undefined)).toBe(DEFAULT_STALE_WEDGE_MS)
  expect(resolvePreCliffOverrideMs(undefined)).toBe(EDGE_CONNECTION_CLIFF_OVERRIDE_MS)
})

test("a readable window is floored to whole milliseconds", () => {
  expect(resolveMaxDeferMs("1500.9")).toBe(1500)
  expect(resolveStaleWedgeMs("0")).toBe(0)
})
