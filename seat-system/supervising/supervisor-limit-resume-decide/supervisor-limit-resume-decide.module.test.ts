import { expect, test } from "bun:test"
import {
  decideLimitResume,
  ELIGIBILITY_HOLD_MS,
  type LimitResumeInput,
} from "./supervisor-limit-resume-decide.module.code.ts"

const NOW = 5_000_000

function asked(over: Partial<LimitResumeInput>): LimitResumeInput {
  return {
    deathDetected: true,
    poolHasCapacity: false,
    eligibilityHeldMs: null,
    earliestResetMs: null,
    now: NOW,
    recentlyNudged: false,
    ...over,
  }
}

test("a turn that did not die on a usage limit holds", () => {
  expect(decideLimitResume(asked({ deathDetected: false })).kind).toBe("hold")
})

test("a seat nudged inside the floor window holds rather than nudging again", () => {
  expect(decideLimitResume(asked({ recentlyNudged: true, poolHasCapacity: true })).kind).toBe(
    "hold"
  )
})

test("an eligible pool held for the whole eligibility hold nudges", () => {
  const said = decideLimitResume(
    asked({ poolHasCapacity: true, eligibilityHeldMs: ELIGIBILITY_HOLD_MS })
  )
  expect(said.kind).toBe("nudge")
})

test("an eligible pool held for less than the eligibility hold waits", () => {
  const said = decideLimitResume(
    asked({ poolHasCapacity: true, eligibilityHeldMs: ELIGIBILITY_HOLD_MS - 1 })
  )
  expect(said.kind).toBe("wait")
})

test("a pool that has read eligible for no measured time waits", () => {
  expect(decideLimitResume(asked({ poolHasCapacity: true, eligibilityHeldMs: null })).kind).toBe(
    "wait"
  )
})

test("a stated eligibility hold is used in place of the default", () => {
  const said = decideLimitResume(
    asked({ poolHasCapacity: true, eligibilityHeldMs: 10, eligibilityHoldMs: 10 })
  )
  expect(said.kind).toBe("nudge")
})

test("an exhausted pool nudges once the earliest reset has arrived", () => {
  expect(decideLimitResume(asked({ earliestResetMs: NOW })).kind).toBe("nudge")
})

test("an exhausted pool waits while the earliest reset is still ahead", () => {
  expect(decideLimitResume(asked({ earliestResetMs: NOW + 1 })).kind).toBe("wait")
})

test("an exhausted pool with no computable reset says so while it waits", () => {
  const said = decideLimitResume(asked({ earliestResetMs: null }))
  expect(said.kind).toBe("wait")
  expect(said.reason).toContain("no computable reset yet")
})
