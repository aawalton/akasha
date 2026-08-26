import { describe, expect, test } from "bun:test"
import {
  type DailyTierColor,
  type DailyTierLadder,
  evalDailyTier,
} from "./tier.ts"
import { FAITH_LEARN_DAILY_LADDER } from "../ladder/ladder.ts"

const FAITH_LADDER = FAITH_LEARN_DAILY_LADDER

describe("evalDailyTier — Faith four-tier ladder", () => {
  test("below the first threshold is black, level 0, next tier red", () => {
    const r = evalDailyTier(0, FAITH_LADDER)
    expect(r.level).toBe(0)
    expect(r.tier).toBe("black")
    expect(r.nextTier).toBe("red")
    expect(r.pointsToNextTier).toBe(2500)
  })

  test("2,499 points still black; 2,500 crosses into red", () => {
    expect(evalDailyTier(2_499, FAITH_LADDER).tier).toBe("black")
    const r = evalDailyTier(2_500, FAITH_LADDER)
    expect(r.level).toBe(1)
    expect(r.tier).toBe("red")
    expect(r.nextTier).toBe("yellow")
    expect(r.pointsToNextTier).toBe(5_000 - 2_500)
  })

  test("a mid-yellow value reports distance to green", () => {
    const r = evalDailyTier(8_200, FAITH_LADDER)
    expect(r.level).toBe(2)
    expect(r.tier).toBe("yellow")
    expect(r.nextTier).toBe("green")
    expect(r.pointsToNextTier).toBe(10_000 - 8_200)
  })

  test("green at ≥10,000", () => {
    const r = evalDailyTier(10_000, FAITH_LADDER)
    expect(r.level).toBe(3)
    expect(r.tier).toBe("green")
    expect(r.nextTier).toBe("blue")
    expect(r.pointsToNextTier).toBe(20_000 - 10_000)
  })

  test("blue is the top tier: no next tier, null distance", () => {
    const r = evalDailyTier(250_000, FAITH_LADDER)
    expect(r.level).toBe(4)
    expect(r.tier).toBe("blue")
    expect(r.nextTier).toBeNull()
    expect(r.pointsToNextTier).toBeNull()
  })

  test("negative points clamp to zero (black)", () => {
    const r = evalDailyTier(-5, FAITH_LADDER)
    expect(r.level).toBe(0)
    expect(r.tier).toBe("black")
    expect(r.pointsToNextTier).toBe(2500)
  })
})

describe("evalDailyTier — progressToNextTier, the fraction of the span already run", () => {
  test("halfway from red to yellow is 0.5", () => {
    expect(evalDailyTier(3_750, FAITH_LADDER).progressToNextTier).toBe(0.5)
  })

  test("standing exactly on a threshold has run none of the span ahead", () => {
    expect(evalDailyTier(2_500, FAITH_LADDER).progressToNextTier).toBe(0)
    expect(evalDailyTier(10_000, FAITH_LADDER).progressToNextTier).toBe(0)
  })

  test("below the first threshold the floor is zero, not a step", () => {
    expect(evalDailyTier(1_875, FAITH_LADDER).progressToNextTier).toBe(0.75)
  })

  test("the top step has no span ahead to be a fraction of", () => {
    expect(evalDailyTier(250_000, FAITH_LADDER).progressToNextTier).toBeNull()
  })

  test("a ladder out of order reports no position rather than a fraction of a backwards span", () => {
    const descending: DailyTierLadder = [
      { threshold: 10, color: "red" },
      { threshold: 5, color: "yellow" },
    ]
    expect(evalDailyTier(12, descending).progressToNextTier).toBeNull()
  })
})

describe("FAITH_LEARN_DAILY_LADDER — the shared Faith/Learn ladder", () => {
  const BOUNDARIES: ReadonlyArray<readonly [number, DailyTierColor]> = [
    [2_500, "red"],
    [5_000, "yellow"],
    [10_000, "green"],
    [20_000, "blue"],
  ]

  test("has exactly four ascending steps red→yellow→green→blue", () => {
    expect(FAITH_LEARN_DAILY_LADDER.map((s) => s.color)).toEqual(["red", "yellow", "green", "blue"])
    expect(FAITH_LEARN_DAILY_LADDER.map((s) => s.threshold)).toEqual([2_500, 5_000, 10_000, 20_000])
  })

  test("each threshold lights its color", () => {
    for (const [points, color] of BOUNDARIES) {
      expect(evalDailyTier(points, FAITH_LEARN_DAILY_LADDER).tier).toBe(color)
    }
  })

  test("below the first threshold is black/unlit", () => {
    expect(evalDailyTier(2_499, FAITH_LEARN_DAILY_LADDER).tier).toBe("black")
  })

  test("Learn is four-tier, not binary: 15,000 points reads green (not red)", () => {
    const r = evalDailyTier(15_000, FAITH_LEARN_DAILY_LADDER)
    expect(r.tier).toBe("green")
    expect(r.level).toBe(3)
    expect(r.nextTier).toBe("blue")
  })
})
