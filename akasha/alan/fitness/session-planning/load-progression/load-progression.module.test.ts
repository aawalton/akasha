import { expect, test } from "bun:test"
import type { PerformedSet } from "../performed-set/performed-set.module.code.ts"
import { decideProgression, type ProgressionInput } from "./load-progression.module.code.ts"

const LADDER = [3, 5, 8, 10, 15, 20, 25, 30]

function performed(weight: number | null, reps: number): PerformedSet {
  return { day: "2026-07-20", setNumber: null, reps, weight, rpe: null, isWarmup: false }
}

function input(
  lastSessionSets: readonly PerformedSet[],
  over: Partial<ProgressionInput> = {}
): ProgressionInput {
  return {
    lastSessionSets,
    repRangeLow: 10,
    repRangeHigh: 15,
    targetSets: 3,
    loadsLadder: LADDER,
    ...over,
  }
}

test("nothing logged introduces the movement at the whole range", () => {
  const decision = decideProgression(input([]))
  expect(decision.action).toBe("introduce")
  expect(decision.prescribedLoad).toBeNull()
  expect(decision.prescribedRepLow).toBe(10)
  expect(decision.prescribedRepHigh).toBe(15)
})

test("sets logged at no reps count as nothing logged", () => {
  expect(decideProgression(input([performed(10, 0)])).action).toBe("introduce")
})

test("short of the top of the range the load holds and the reps are beaten", () => {
  const decision = decideProgression(input([performed(10, 12), performed(10, 11)]))
  expect(decision.action).toBe("beat-reps")
  expect(decision.prescribedLoad).toBe(10)
  expect(decision.rationale).toContain("beat 12→13")
})

test("one set short of the range holds the whole movement back", () => {
  const decision = decideProgression(input([performed(10, 15), performed(10, 14)]))
  expect(decision.action).toBe("beat-reps")
})

test("the load worked at is the one most sets were at", () => {
  const decision = decideProgression(
    input([performed(20, 15), performed(10, 12), performed(10, 12)])
  )
  expect(decision.prescribedLoad).toBe(10)
})

test("every set at the top of the range moves the load up one rung", () => {
  const decision = decideProgression(input([performed(10, 15), performed(10, 15)]))
  expect(decision.action).toBe("increase-load")
  expect(decision.prescribedLoad).toBe(15)
  expect(decision.prescribedRepLow).toBe(10)
})

test("a rung dropping the reps below the floor is refused", () => {
  const decision = decideProgression(input([performed(3, 15)], { loadsLadder: [3, 30] }))
  expect(decision.action).toBe("hold-extend-reps")
  expect(decision.prescribedLoad).toBe(3)
  expect(decision.coarseJumpGuardFired).toBe(true)
  expect(decision.prescribedSets).toBe(3)
  expect(decision.prescribedRepHigh).toBe(17)
})

test("the top of the ladder extends the reps and gains a set", () => {
  const decision = decideProgression(input([performed(30, 15)]))
  expect(decision.action).toBe("hold-extend-reps")
  expect(decision.prescribedLoad).toBe(30)
  expect(decision.prescribedSets).toBe(4)
  expect(decision.prescribedRepLow).toBe(15)
  expect(decision.prescribedRepHigh).toBe(17)
})

test("bodyweight at the top of the range extends the reps and gains a set", () => {
  const decision = decideProgression(input([performed(null, 15), performed(null, 16)]))
  expect(decision.action).toBe("hold-extend-reps")
  expect(decision.prescribedLoad).toBeNull()
  expect(decision.prescribedSets).toBe(4)
})

test("bodyweight short of the range beats reps and says so", () => {
  const decision = decideProgression(input([performed(null, 12)]))
  expect(decision.action).toBe("beat-reps")
  expect(decision.rationale).toContain("bodyweight")
})

test("only the guard reports itself as fired", () => {
  expect(decideProgression(input([])).coarseJumpGuardFired).toBe(false)
  expect(decideProgression(input([performed(10, 12)])).coarseJumpGuardFired).toBe(false)
  expect(decideProgression(input([performed(10, 15)])).coarseJumpGuardFired).toBe(false)
})

test("every decision states why it was reached", () => {
  const cases = [
    input([]),
    input([performed(10, 12)]),
    input([performed(10, 15)]),
    input([performed(30, 15)]),
    input([performed(null, 15)]),
  ]
  for (const one of cases) {
    expect(decideProgression(one).rationale.length).toBeGreaterThan(0)
  }
})
