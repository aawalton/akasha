import { expect, test } from "bun:test"
import { REQUIRED_WEEKLY_PATTERNS } from "../pattern-groups/pattern-groups.module.code.ts"
import {
  computeCoverage,
  isGapPattern,
  isUnilateralLaterality,
  patternLateralityKey,
  type WeekMovement,
} from "./weekly-coverage.module.code.ts"

function did(
  movementPattern: WeekMovement["movementPattern"],
  laterality: WeekMovement["laterality"] = "bilateral"
): WeekMovement {
  return { movementPattern, laterality }
}

test("an empty week owes every required pattern", () => {
  const coverage = computeCoverage([])
  expect(coverage.covered).toEqual([])
  expect(coverage.gaps).toEqual([...REQUIRED_WEEKLY_PATTERNS])
})

test("a pattern performed is covered and no longer a gap", () => {
  const coverage = computeCoverage([did("squat")])
  expect(coverage.covered).toEqual(["squat"])
  expect(coverage.gaps).not.toContain("squat")
  expect(isGapPattern(coverage, "squat")).toBe(false)
})

test("a pattern outside the required list neither covers nor closes a gap", () => {
  const coverage = computeCoverage([did("isolation-other")])
  expect(coverage.covered).toEqual([])
  expect(coverage.gaps).toEqual([...REQUIRED_WEEKLY_PATTERNS])
})

test("any one core anti-pattern covers the core", () => {
  expect(computeCoverage([did("core-anti-rotation")]).coreAntiCovered).toBe(true)
  expect(computeCoverage([did("squat")]).coreAntiCovered).toBe(false)
})

test("a core anti-pattern is a gap until the core is covered", () => {
  const empty = computeCoverage([])
  expect(isGapPattern(empty, "core-anti-extension")).toBe(true)
  const done = computeCoverage([did("core-anti-lateral-flexion")])
  expect(isGapPattern(done, "core-anti-extension")).toBe(false)
})

test("alternating counts as unilateral", () => {
  expect(isUnilateralLaterality("alternating")).toBe(true)
  expect(isUnilateralLaterality("unilateral")).toBe(true)
  expect(isUnilateralLaterality("bilateral")).toBe(false)
})

test("upper and lower unilateral work are covered apart", () => {
  const upper = computeCoverage([did("h-push", "unilateral")])
  expect(upper.unilateralUpperCovered).toBe(true)
  expect(upper.unilateralLowerCovered).toBe(false)
  const lower = computeCoverage([did("lunge", "alternating")])
  expect(lower.unilateralLowerCovered).toBe(true)
  expect(lower.unilateralUpperCovered).toBe(false)
})

test("bilateral work covers no unilateral region", () => {
  const coverage = computeCoverage([did("h-push"), did("squat")])
  expect(coverage.unilateralUpperCovered).toBe(false)
  expect(coverage.unilateralLowerCovered).toBe(false)
})

test("the key holds a pattern apart by whether it was one-sided", () => {
  expect(patternLateralityKey("squat", "unilateral")).toBe("squat:unilateral")
  expect(patternLateralityKey("squat", "alternating")).toBe("squat:unilateral")
  expect(patternLateralityKey("squat", "bilateral")).toBe("squat:bilateral")
})
