import { describe, expect, test } from "bun:test"
import { cumulativeTrainCost, maxAffordableTrainCount, trainCost } from "../core/accrual"
import { TRAIN_BULK_COUNT, TRAIN_COST_BASE, TRAIN_COST_GROWTH } from "../core/constants"
import { type GameState, type Teammate } from "../core/types"
import { applyIntent } from "../idle-actions"
import { freshState, NOW } from "./test-helpers"

describe("idle-actions — train", () => {
  test("raises rank and deducts the geometric train cost", () => {
    const s = freshState(1000)
    const aura = s.teammates.find((t) => t.slug === "aura")
    if (aura === undefined) throw new Error("seed missing aura")
    const cost = trainCost(aura)
    const { state, outcome } = applyIntent(s, { type: "train", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.resource).toBe(1000 - cost)
    expect(state.teammates.find((t) => t.slug === "aura")?.rank).toBe(1)
  })

  test("training an unowned teammate is a no-op", () => {
    const s = freshState(100000)
    const { outcome } = applyIntent(s, { type: "train", slug: "amy" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "not-owned" })
  })

  test("insufficient resource is a visible no-op", () => {
    const s = freshState(1)
    const { outcome } = applyIntent(s, { type: "train", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "insufficient" })
  })
})

describe("idle-actions — train10 (buy exactly ten ranks, all-or-nothing #15554)", () => {
  function auraTenCost(resource: number): number {
    const aura = freshState(resource).teammates.find((t) => t.slug === "aura")
    if (aura === undefined) throw new Error("seed missing aura")
    return cumulativeTrainCost(aura, TRAIN_BULK_COUNT)
  }

  test("raises rank by exactly ten and deducts the cumulative ten-rank cost", () => {
    const cost = auraTenCost(0)
    const s = freshState(cost + 500)
    const { state, outcome } = applyIntent(s, { type: "train10", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.teammates.find((t) => t.slug === "aura")?.rank).toBe(TRAIN_BULK_COUNT)
    expect(state.resource).toBe(cost + 500 - cost)
  })

  test("exactly affordable (resource === cost) → applies the full ten (boundary)", () => {
    const cost = auraTenCost(0)
    const s = freshState(cost)
    const { state, outcome } = applyIntent(s, { type: "train10", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.teammates.find((t) => t.slug === "aura")?.rank).toBe(TRAIN_BULK_COUNT)
    expect(state.resource).toBe(0)
  })

  test("one short (resource === cost - 1) → no-op, NO partial buy (boundary)", () => {
    const cost = auraTenCost(0)
    const s = freshState(cost - 1)
    const { state, outcome } = applyIntent(s, { type: "train10", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "insufficient" })
    expect(state.teammates.find((t) => t.slug === "aura")?.rank).toBe(0)
    expect(state.resource).toBe(cost - 1)
  })

  test("the ten-rank cost equals ten sequential single trains (single-sourced)", () => {
    const cost = auraTenCost(0)
    let s = freshState(cost)
    for (let k = 0; k < TRAIN_BULK_COUNT; k++) {
      s = applyIntent(s, { type: "train", slug: "aura" }, NOW).state
    }
    expect(s.resource).toBe(0)
    expect(s.teammates.find((t) => t.slug === "aura")?.rank).toBe(TRAIN_BULK_COUNT)
  })

  test("a +10 on an unowned teammate is a no-op", () => {
    const s = freshState(1_000_000_000)
    const { outcome } = applyIntent(s, { type: "train10", slug: "amy" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "not-owned" })
  })
})

describe("idle-actions — trainMax (buy as many ranks as affordable #15555)", () => {
  const auraOf = (s: GameState): Teammate => {
    const t = s.teammates.find((x) => x.slug === "aura")
    if (t === undefined) throw new Error("seed missing aura")
    return t
  }
  const rankOf = (s: GameState) => s.teammates.find((t) => t.slug === "aura")?.rank

  test("buys exactly the max-affordable count and deducts its cumulative cost", () => {
    const a = auraOf(freshState(0))
    const budget = cumulativeTrainCost(a, 3) + (trainCost({ rate: a.rate, rank: 3 }) - 1)
    const s = freshState(budget)
    expect(maxAffordableTrainCount(auraOf(s), budget)).toBe(3)
    const { state, outcome } = applyIntent(s, { type: "trainMax", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(rankOf(state)).toBe(3)
    expect(state.resource).toBe(budget - cumulativeTrainCost(a, 3))
  })

  test("zero affordable (one short of the next rank) → no-op, DISABLED-button case", () => {
    const oneCost = trainCost(auraOf(freshState(0)))
    const s = freshState(oneCost - 1)
    const { state, outcome } = applyIntent(s, { type: "trainMax", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "insufficient" })
    expect(rankOf(state)).toBe(0)
    expect(state.resource).toBe(oneCost - 1)
  })

  test("a large resource buys many ranks, and the max is truly maxed", () => {
    const budget = 5_000_000
    const count = maxAffordableTrainCount(auraOf(freshState(budget)), budget)
    const { state } = applyIntent(freshState(budget), { type: "trainMax", slug: "aura" }, NOW)
    expect(rankOf(state)).toBe(count)
    expect(count).toBeGreaterThan(TRAIN_BULK_COUNT)
    expect(applyIntent(state, { type: "train", slug: "aura" }, NOW).outcome).toEqual({
      applied: false,
      reason: "insufficient",
    })
  })

  test("a Max on an unowned teammate is a no-op", () => {
    expect(applyIntent(freshState(1e9), { type: "trainMax", slug: "amy" }, NOW).outcome).toEqual({
      applied: false,
      reason: "not-owned",
    })
  })
})

describe("idle-actions — trainCost is a zero-indexed, unshifted schedule", () => {
  const RATE = 10

  test("a fresh persona's first purchase (rank 0) costs the base, not a discounted GROWTH^-1", () => {
    expect(trainCost({ rate: RATE, rank: 0 })).toBe(Math.ceil(RATE * TRAIN_COST_BASE))
  })

  test("the per-purchase price is invariant under re-indexing (rank == purchases)", () => {
    for (let k = 0; k < 5; k++) {
      expect(trainCost({ rate: RATE, rank: k })).toBe(
        Math.ceil(RATE * TRAIN_COST_BASE * TRAIN_COST_GROWTH ** k)
      )
    }
  })
})
