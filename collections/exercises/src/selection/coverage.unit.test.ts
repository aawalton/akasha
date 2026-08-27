import { describe, expect, test } from "bun:test"
import {
  computeCoverage,
  isGapPattern,
  isUnilateralLaterality,
  patternLateralityKey,
  type WeekMovement,
} from "./coverage"

function m(movementPattern: string, laterality = "bilateral"): WeekMovement {
  return { movementPattern, laterality }
}

describe("computeCoverage", () => {
  test("an empty week is all gaps, nothing covered", () => {
    const c = computeCoverage([])
    expect(c.covered).toEqual([])
    expect(c.gaps).toEqual(["h-push", "v-push", "h-pull", "v-pull", "squat", "hinge", "carry"])
    expect(c.coreAntiCovered).toBe(false)
    expect(c.unilateralUpperCovered).toBe(false)
    expect(c.unilateralLowerCovered).toBe(false)
  })

  test("covered simple patterns are reported and removed from gaps", () => {
    const c = computeCoverage([m("h-push"), m("squat"), m("carry")])
    expect(c.covered).toEqual(["h-push", "squat", "carry"])
    expect(c.gaps).toEqual(["v-push", "h-pull", "v-pull", "hinge"])
  })

  test("the core-anti bucket is satisfied by any of the three anti-patterns", () => {
    expect(computeCoverage([m("core-anti-rotation")]).coreAntiCovered).toBe(true)
    expect(computeCoverage([m("core-anti-rotation")]).gaps).toContain("h-push")
  })

  test("unilateral upper/lower require both a unilateral laterality and the right region", () => {
    const upper = computeCoverage([m("v-pull", "unilateral")])
    expect(upper.unilateralUpperCovered).toBe(true)
    expect(upper.unilateralLowerCovered).toBe(false)

    const lower = computeCoverage([m("lunge", "alternating")])
    expect(lower.unilateralLowerCovered).toBe(true)
    expect(lower.unilateralUpperCovered).toBe(false)

    expect(computeCoverage([m("h-push", "bilateral")]).unilateralUpperCovered).toBe(false)
  })
})

describe("isGapPattern", () => {
  test("an uncovered required pattern is a gap", () => {
    const c = computeCoverage([m("h-push")])
    expect(isGapPattern(c, "hinge")).toBe(true)
    expect(isGapPattern(c, "h-push")).toBe(false)
  })

  test("a core-anti pattern is a gap only while the core-anti bucket is empty", () => {
    expect(isGapPattern(computeCoverage([]), "core-anti-extension")).toBe(true)
    expect(isGapPattern(computeCoverage([m("core-anti-rotation")]), "core-anti-extension")).toBe(
      false
    )
  })

  test("a non-required pattern (isolation-other) is never a gap", () => {
    expect(isGapPattern(computeCoverage([]), "isolation-other")).toBe(false)
  })
})

describe("isUnilateralLaterality", () => {
  test("both single-side lateralities count — one side works at a time either way", () => {
    expect(isUnilateralLaterality("unilateral")).toBe(true)
    expect(isUnilateralLaterality("alternating")).toBe(true)
  })

  test("bilateral and an unrecognized value do not", () => {
    expect(isUnilateralLaterality("bilateral")).toBe(false)
    expect(isUnilateralLaterality("")).toBe(false)
  })
})

describe("patternLateralityKey", () => {
  test("a pattern trained on one side is a different key from the same pattern on both", () => {
    expect(patternLateralityKey("squat", "unilateral")).not.toBe(
      patternLateralityKey("squat", "bilateral")
    )
  })

  test("unilateral and alternating share one key — neither passes as variety against the other", () => {
    expect(patternLateralityKey("lunge", "alternating")).toBe(
      patternLateralityKey("lunge", "unilateral")
    )
  })

  test("the same laterality under different patterns stays distinct", () => {
    expect(patternLateralityKey("squat", "bilateral")).not.toBe(
      patternLateralityKey("hinge", "bilateral")
    )
  })
})
