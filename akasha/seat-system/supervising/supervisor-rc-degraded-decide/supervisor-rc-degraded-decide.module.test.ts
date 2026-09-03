import { expect, test } from "bun:test"
import {
  CLEAR_RC_CONFIRM_LATCH,
  INITIAL_RC_SEAT_STREAK,
} from "../supervisor-rc-degraded-state/supervisor-rc-degraded-state.module.code.ts"
import { DEFAULT_RC_DEGRADED_THRESHOLDS } from "../supervisor-rc-degraded-thresholds/supervisor-rc-degraded-thresholds.module.code.ts"
import {
  decideRcDegraded,
  decideRcDegradedBatch,
  type RcDegradedDecideInput,
} from "./supervisor-rc-degraded-decide.module.code.ts"

const T = DEFAULT_RC_DEGRADED_THRESHOLDS

const NOW = 1_000_000

function asked(over: Partial<RcDegradedDecideInput>): RcDegradedDecideInput {
  return {
    edgeCount: 0,
    childAgeMs: null,
    priorStreak: INITIAL_RC_SEAT_STREAK,
    latch: CLEAR_RC_CONFIRM_LATCH,
    healthyFloor: T.healthyFloor,
    debounceStreak: T.debounceStreak,
    recoveryStreak: T.recoveryStreak,
    reAlertCooldownMs: T.reAlertCooldownMs,
    bootSettleMs: T.bootSettleMs,
    bootCeilingMs: T.bootCeilingMs,
    maintenanceResumeQuiet: false,
    now: NOW,
    ...over,
  }
}

test("a tick that read no edge count leaves the streak and the latch as they were", () => {
  const priorStreak = { degradedStreak: 3, healthyStreak: 0 }
  const latch = { alertedAt: 42 }
  const said = decideRcDegraded(asked({ edgeCount: null, priorStreak, latch }))
  expect(said).toEqual({ action: "none", nextStreak: priorStreak, nextLatch: latch })
})

test("a degraded reading says nothing until the degraded streak reaches the debounce streak", () => {
  let streak = INITIAL_RC_SEAT_STREAK
  for (let seen = 1; seen < T.debounceStreak; seen += 1) {
    const said = decideRcDegraded(asked({ priorStreak: streak }))
    expect(said.action).toBe("none")
    expect(said.nextStreak.degradedStreak).toBe(seen)
    streak = said.nextStreak
  }
  const alerted = decideRcDegraded(asked({ priorStreak: streak }))
  expect(alerted.action).toBe("alert")
  expect(alerted.nextLatch).toEqual({ alertedAt: NOW })
})

test("a reading at the healthy floor is healthy rather than degraded", () => {
  const said = decideRcDegraded(asked({ edgeCount: T.healthyFloor }))
  expect(said.action).toBe("none")
  expect(said.nextStreak).toEqual(INITIAL_RC_SEAT_STREAK)
})

test("a seat already latched as alerted is not alerted again", () => {
  const said = decideRcDegraded(
    asked({ priorStreak: { degradedStreak: 99, healthyStreak: 0 }, latch: { alertedAt: 1 } })
  )
  expect(said.action).toBe("none")
  expect(said.nextLatch).toEqual({ alertedAt: 1 })
})

test("a child under the boot settle is given the settle before anything is said", () => {
  const said = decideRcDegraded(
    asked({
      priorStreak: { degradedStreak: T.debounceStreak, healthyStreak: 0 },
      childAgeMs: T.bootSettleMs - 1,
    })
  )
  expect(said.action).toBe("none")
  expect(said.nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
})

test("a child past the settle and under the ceiling reads as booting dark", () => {
  const said = decideRcDegraded(
    asked({
      priorStreak: { degradedStreak: T.debounceStreak, healthyStreak: 0 },
      childAgeMs: T.bootSettleMs,
    })
  )
  expect(said.action).toBe("boot-dark")
  expect(said.nextLatch).toEqual({ alertedAt: NOW })
})

test("a child past the boot ceiling is alerted about rather than read as booting", () => {
  const said = decideRcDegraded(
    asked({
      priorStreak: { degradedStreak: T.debounceStreak, healthyStreak: 0 },
      childAgeMs: T.bootCeilingMs,
    })
  )
  expect(said.action).toBe("alert")
})

test("a seat resuming quietly for maintenance is not alerted about", () => {
  const said = decideRcDegraded(
    asked({
      priorStreak: { degradedStreak: T.debounceStreak, healthyStreak: 0 },
      maintenanceResumeQuiet: true,
    })
  )
  expect(said.action).toBe("none")
  expect(said.nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
})

test("a latch clears once the healthy streak and the cooldown are both met", () => {
  const latch = { alertedAt: NOW - T.reAlertCooldownMs }
  const said = decideRcDegraded(
    asked({
      edgeCount: T.healthyFloor,
      latch,
      priorStreak: { degradedStreak: 0, healthyStreak: T.recoveryStreak - 1 },
    })
  )
  expect(said.nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
  expect(said.nextStreak).toEqual(INITIAL_RC_SEAT_STREAK)
})

test("a latch holds while the cooldown has not passed, however healthy the streak", () => {
  const latch = { alertedAt: NOW - 1 }
  const said = decideRcDegraded(
    asked({
      edgeCount: T.healthyFloor,
      latch,
      priorStreak: { degradedStreak: 0, healthyStreak: T.recoveryStreak * 10 },
    })
  )
  expect(said.nextLatch).toEqual(latch)
})

test("a batch answers each seat under its own thresholds and keeps the seat's name", () => {
  const said = decideRcDegradedBatch([
    {
      seat: "one",
      priorStreak: { degradedStreak: T.debounceStreak, healthyStreak: 0 },
      latch: CLEAR_RC_CONFIRM_LATCH,
      observation: {
        edgeCount: 0,
        childAgeMs: null,
        maintenanceResumeQuiet: false,
        now: NOW,
      },
      thresholds: T,
    },
    {
      seat: "two",
      priorStreak: INITIAL_RC_SEAT_STREAK,
      latch: CLEAR_RC_CONFIRM_LATCH,
      observation: {
        edgeCount: 9,
        childAgeMs: null,
        maintenanceResumeQuiet: false,
        now: NOW,
      },
      thresholds: T,
    },
  ])
  expect(said.map((one) => [one.seat, one.action])).toEqual([
    ["one", "alert"],
    ["two", "none"],
  ])
})
