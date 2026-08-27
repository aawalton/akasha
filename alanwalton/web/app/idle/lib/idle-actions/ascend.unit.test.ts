import { describe, expect, test } from "bun:test"
import { gainedStars } from "../core/accrual"
import { applyIntent } from "../idle-actions"
import { NOW, ownedState } from "./test-helpers"

describe("idle-actions — ascend", () => {
  test("resets ranks and grants stars when eligible", () => {
    const s = ownedState(20)
    const { state, outcome } = applyIntent(s, { type: "ascend" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.legacyStars).toBe(2)
    expect(state.teammates.every((t) => t.rank === 0)).toBe(true)
  })

  test("resets Moments/resource to exactly 0 on ascend (#14780)", () => {
    const s = ownedState(20, { resource: 5_000 })
    const { state, outcome } = applyIntent(s, { type: "ascend" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.resource).toBe(0)
  })

  test("the granted star delta equals gainedStars(s) — single source (#14780)", () => {
    const s = ownedState(20, { legacyStars: 7 })
    const { state, outcome } = applyIntent(s, { type: "ascend" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect((state.legacyStars ?? 0) - (s.legacyStars ?? 0)).toBe(gainedStars(s))
  })

  test("too few ranks is a no-op", () => {
    const s = ownedState(1)
    const { outcome } = applyIntent(s, { type: "ascend" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "too-soon" })
  })
})
