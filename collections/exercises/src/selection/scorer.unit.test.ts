import { describe, expect, test } from "bun:test"
import {
  aestheticsScore,
  energyScore,
  functionalityScore,
  type GoalWeights,
  longevityScore,
  type MovementFeatures,
  scoreMovement,
} from "./scorer"

function features(over: Partial<MovementFeatures> = {}): MovementFeatures {
  return {
    primaryMuscles: [],
    secondaryMuscles: [],
    ...over,
  }
}

const SETTLED_WEIGHTS: GoalWeights = {
  longevity: 40,
  energy: 30,
  functionality: 20,
  aesthetics: 10,
}

const KB_SWING = features({
  movementPattern: "hinge",
  laterality: "unilateral",
  isBallistic: true,
  skillCost: "moderate",
  trainsLengthenedRange: false,
  gripDemand: "high",
  sfrScore: 3,
  category: "strength",
  mechanic: "compound",
  primaryMuscles: ["hamstrings"],
  secondaryMuscles: ["calves", "glutes", "lower-back", "shoulders"],
})

const CONCENTRATION_CURL = features({
  movementPattern: "isolation-other",
  laterality: "unilateral",
  isBallistic: false,
  skillCost: "low",
  trainsLengthenedRange: false,
  gripDemand: "low",
  sfrScore: 4,
  category: "strength",
  mechanic: "isolation",
  primaryMuscles: ["biceps"],
  secondaryMuscles: ["forearms"],
})

describe("per-goal scores", () => {
  test("longevity rewards a compound, ballistic, large-mass, grip-heavy movement", () => {
    expect(longevityScore(KB_SWING)).toBeCloseTo(0.96, 5)
  })

  test("longevity gives an isolation curl only its small SFR nudge", () => {
    expect(longevityScore(CONCENTRATION_CURL)).toBeCloseTo(0.08, 5)
  })

  test("energy rewards ballistic full-body work, zero for a pure isolation curl", () => {
    expect(energyScore(KB_SWING)).toBeCloseTo(0.4, 5)
    expect(energyScore(CONCENTRATION_CURL)).toBe(0)
  })

  test("energy maxes a cardio movement on the category term", () => {
    expect(energyScore(features({ category: "cardio" }))).toBeCloseTo(0.45, 5)
  })

  test("functionality blends functional-strength (0.6) and mobility (0.4)", () => {
    expect(functionalityScore(KB_SWING)).toBeCloseTo(0.51, 5)
    expect(functionalityScore(CONCENTRATION_CURL)).toBeCloseTo(0.15, 5)
  })

  test("mobility term lifts a lengthened-range unilateral hinge (single-leg RDL)", () => {
    const slRdl = features({
      movementPattern: "hinge",
      laterality: "unilateral",
      mechanic: "compound",
      trainsLengthenedRange: true,
      primaryMuscles: ["hamstrings"],
    })
    expect(functionalityScore(slRdl)).toBeCloseTo(0.65, 5)
  })

  test("aesthetics maxes an isolation curl on a visible muscle", () => {
    expect(aestheticsScore(CONCENTRATION_CURL)).toBe(1)
  })

  test("aesthetics gives a posterior-chain ballistic swing nothing", () => {
    expect(aestheticsScore(KB_SWING)).toBe(0)
  })

  test("every per-goal score clamps into [0,1]", () => {
    for (const f of [KB_SWING, CONCENTRATION_CURL]) {
      for (const s of [
        longevityScore(f),
        energyScore(f),
        functionalityScore(f),
        aestheticsScore(f),
      ]) {
        expect(s).toBeGreaterThanOrEqual(0)
        expect(s).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe("blend", () => {
  test("is a weighted average in [0,1], invariant to weight scale (40/30/20/10 vs 0.4/0.3/0.2/0.1)", () => {
    const scaled = scoreMovement(KB_SWING, {
      longevity: 0.4,
      energy: 0.3,
      functionality: 0.2,
      aesthetics: 0.1,
    })
    const whole = scoreMovement(KB_SWING, SETTLED_WEIGHTS)
    expect(whole.blend).toBeCloseTo(scaled.blend, 10)
    expect(whole.blend).toBeGreaterThanOrEqual(0)
    expect(whole.blend).toBeLessThanOrEqual(1)
  })

  test("a zeroed policy never divides by zero", () => {
    const s = scoreMovement(KB_SWING, { longevity: 0, energy: 0, functionality: 0, aesthetics: 0 })
    expect(Number.isFinite(s.blend)).toBe(true)
  })
})

describe("convergence: a multi-goal movement outscores a single-goal one at 40/30/20/10", () => {
  const swing = scoreMovement(KB_SWING, SETTLED_WEIGHTS)
  const curl = scoreMovement(CONCENTRATION_CURL, SETTLED_WEIGHTS)

  test("the concentration curl genuinely maxes aesthetics", () => {
    expect(curl.aesthetics).toBe(1)
  })

  test("the KB swing still outscores it on the blend", () => {
    expect(swing.blend).toBeGreaterThan(curl.blend)
    expect(swing.blend).toBeCloseTo(0.606, 3)
    expect(curl.blend).toBeCloseTo(0.162, 3)
  })

  test("aesthetics alone can never win a slot: an aesthetics-only movement caps at the aesthetics weight", () => {
    const aestheticsOnly = scoreMovement(
      features({ isBallistic: false, mechanic: "isolation", primaryMuscles: ["biceps"] }),
      SETTLED_WEIGHTS
    )
    expect(aestheticsOnly.aesthetics).toBe(1)
    expect(aestheticsOnly.blend).toBeCloseTo(0.1, 5)
    expect(swing.blend).toBeGreaterThan(aestheticsOnly.blend)
  })

  test("ranking a real set puts the aesthetics-maxed curl below the multi-goal movements", () => {
    const set = [CONCENTRATION_CURL, KB_SWING]
    const ranked = [...set]
      .map((f) => ({ f, blend: scoreMovement(f, SETTLED_WEIGHTS).blend }))
      .sort((a, b) => b.blend - a.blend)
    expect(ranked[0]?.f).toBe(KB_SWING)
    expect(ranked[1]?.f).toBe(CONCENTRATION_CURL)
  })
})
