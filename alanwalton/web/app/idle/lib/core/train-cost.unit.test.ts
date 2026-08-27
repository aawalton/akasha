import { describe, expect, test } from "bun:test"
import { cumulativeTrainCost, maxAffordableTrainCount, trainCost } from "./accrual"
import { TRAIN_BULK_COUNT, TRAIN_COST_BASE, TRAIN_COST_GROWTH } from "./constants"

describe("cumulativeTrainCost — Σ trainCost over the next `count` ranks", () => {
  const t = (rate: number, rank: number) => ({ rate, rank })

  test("count 1 equals the single next-rank trainCost", () => {
    expect(cumulativeTrainCost(t(3, 0), 1)).toBe(trainCost(t(3, 0)))
    expect(cumulativeTrainCost(t(3, 7), 1)).toBe(trainCost(t(3, 7)))
  })

  test("sums each rank's ceil-ed cost individually (not a closed form over the sum)", () => {
    const expected =
      trainCost(t(3, 0)) + trainCost(t(3, 1)) + trainCost(t(3, 2)) + trainCost(t(3, 3))
    expect(cumulativeTrainCost(t(3, 0), 4)).toBe(expected)
  })

  test("respects the current rank — starts from rank, not 0", () => {
    const fromRank5 = trainCost(t(2, 5)) + trainCost(t(2, 6)) + trainCost(t(2, 7))
    expect(cumulativeTrainCost(t(2, 5), 3)).toBe(fromRank5)
  })

  test("the +10 stride sums ten consecutive ranks", () => {
    let manual = 0
    for (let k = 0; k < TRAIN_BULK_COUNT; k++) manual += trainCost(t(4, 2 + k))
    expect(cumulativeTrainCost(t(4, 2), TRAIN_BULK_COUNT)).toBe(manual)
  })

  test("count 0 (or negative) costs nothing — an empty buy is free", () => {
    expect(cumulativeTrainCost(t(3, 0), 0)).toBe(0)
    expect(cumulativeTrainCost(t(3, 4), -1)).toBe(0)
  })

  test("a rank-0 persona's first ten ranks match the constants schedule", () => {
    let manual = 0
    for (let k = 0; k < TRAIN_BULK_COUNT; k++) {
      manual += Math.ceil(5 * TRAIN_COST_BASE * TRAIN_COST_GROWTH ** k)
    }
    expect(cumulativeTrainCost(t(5, 0), TRAIN_BULK_COUNT)).toBe(manual)
  })
})

describe("maxAffordableTrainCount — greatest N whose next-N ranks fit the budget", () => {
  const t = (rate: number, rank: number) => ({ rate, rank })

  test("zero affordable → 0 (the disabled-button boundary)", () => {
    expect(maxAffordableTrainCount(t(3, 0), trainCost(t(3, 0)) - 1)).toBe(0)
    expect(maxAffordableTrainCount(t(3, 0), 0)).toBe(0)
    expect(maxAffordableTrainCount(t(3, 5), -10)).toBe(0)
  })

  test("exactly one affordable → 1 (buys the next rank, not the one after)", () => {
    const one = trainCost(t(3, 0))
    expect(maxAffordableTrainCount(t(3, 0), one)).toBe(1)
    expect(maxAffordableTrainCount(t(3, 0), one + trainCost(t(3, 1)) - 1)).toBe(1)
  })

  test("exact cumulative budget buys exactly that many (boundary, no rounding slack)", () => {
    for (const n of [2, 3, 7, TRAIN_BULK_COUNT]) {
      const budget = cumulativeTrainCost(t(4, 2), n)
      expect(maxAffordableTrainCount(t(4, 2), budget)).toBe(n)
      expect(maxAffordableTrainCount(t(4, 2), budget - 1)).toBe(n - 1)
    }
  })

  test("respects the current rank — counts from rank, not 0", () => {
    const budget = trainCost(t(2, 5)) + trainCost(t(2, 6))
    expect(maxAffordableTrainCount(t(2, 5), budget)).toBe(2)
  })

  test("a large resource buys many ranks — and the spend stays within budget", () => {
    const budget = 1e15
    const count = maxAffordableTrainCount(t(5, 0), budget)
    expect(count).toBeGreaterThan(TRAIN_BULK_COUNT)
    expect(Number.isFinite(count)).toBe(true)
    expect(cumulativeTrainCost(t(5, 0), count)).toBeLessThanOrEqual(budget)
    expect(cumulativeTrainCost(t(5, 0), count + 1)).toBeGreaterThan(budget)
  })

  test("the count equals that many sequential single trainCost deductions", () => {
    const budget = 50_000
    const count = maxAffordableTrainCount(t(3, 0), budget)
    let spent = 0
    let manual = 0
    for (;;) {
      const next = trainCost(t(3, manual))
      if (spent + next > budget) break
      spent += next
      manual++
    }
    expect(count).toBe(manual)
  })
})
