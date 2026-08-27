import { describe, expect, test } from "bun:test"
import { effectiveScore, type RecencyPolicy, recencyBonus } from "./recency"

const POLICY: RecencyPolicy = { recencyWeight: 0.05, recencySaturationDays: 21 }
const TODAY = "2026-07-25"

describe("recencyBonus", () => {
  test("a never-performed movement earns nothing — stale is not novel", () => {
    expect(recencyBonus(null, TODAY, POLICY)).toBe(0)
  })

  test("a movement performed today earns nothing — zero days is not stale", () => {
    expect(recencyBonus(TODAY, TODAY, POLICY)).toBe(0)
  })

  test("the bonus ramps with days since last performed", () => {
    const oneWeek = recencyBonus("2026-07-18", TODAY, POLICY)
    const twoWeeks = recencyBonus("2026-07-11", TODAY, POLICY)
    expect(oneWeek).toBeCloseTo(0.05 * (7 / 21), 10)
    expect(twoWeeks).toBeCloseTo(0.05 * (14 / 21), 10)
    expect(twoWeeks).toBeGreaterThan(oneWeek)
  })

  test("the bonus saturates — staleness does not grow without bound", () => {
    const threeWeeks = recencyBonus("2026-07-04", TODAY, POLICY)
    const sixMonths = recencyBonus("2026-01-25", TODAY, POLICY)
    expect(threeWeeks).toBeCloseTo(0.05, 10)
    expect(sixMonths).toBe(threeWeeks)
  })

  test("a future day string cannot produce a negative bonus", () => {
    expect(recencyBonus("2026-07-30", TODAY, POLICY)).toBe(0)
  })

  test("the weight and the saturation point are read from the policy, not hard-coded", () => {
    const hot: RecencyPolicy = { recencyWeight: 0.2, recencySaturationDays: 7 }
    expect(recencyBonus("2026-07-18", TODAY, hot)).toBeCloseTo(0.2, 10)
    expect(recencyBonus("2026-07-22", TODAY, hot)).toBeCloseTo(0.2 * (3 / 7), 10)
  })

  test("a zero or negative saturation point degrades to no bonus rather than dividing by zero", () => {
    expect(
      recencyBonus("2026-07-01", TODAY, { recencyWeight: 0.05, recencySaturationDays: 0 })
    ).toBe(0)
  })
})

describe("effectiveScore — the objective the accessory ranking maximizes", () => {
  test("a stale movement outranks an identically-scoring one performed yesterday", () => {
    const stale = effectiveScore(0.4, recencyBonus("2026-07-01", TODAY, POLICY))
    const fresh = effectiveScore(0.4, recencyBonus("2026-07-24", TODAY, POLICY))
    expect(stale).toBeGreaterThan(fresh)
  })

  test("a saturated bonus never promotes a clearly-inferior movement over a clearly-better one", () => {
    const inferiorStale = effectiveScore(0.196, recencyBonus("2026-01-01", TODAY, POLICY))
    const betterFresh = effectiveScore(0.396, recencyBonus(TODAY, TODAY, POLICY))
    expect(inferiorStale).toBeLessThan(betterFresh)
  })

  test("a saturated bonus can outrank a comparable movement trained this week", () => {
    const comparableStale = effectiveScore(0.356, recencyBonus("2026-06-01", TODAY, POLICY))
    const slightlyBetterRecent = effectiveScore(0.396, recencyBonus("2026-07-23", TODAY, POLICY))
    expect(comparableStale).toBeGreaterThan(slightlyBetterRecent)
  })
})
