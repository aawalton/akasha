import { describe, expect, test } from "bun:test"
import { applyIntent } from "../idle-actions"
import { NOW, ownedState } from "./test-helpers"

describe("idle-actions — specialize / perk / apotheosis gates", () => {
  test("specialize is locked until its unlock", () => {
    const s = ownedState(40)
    const { outcome } = applyIntent(s, { type: "specialize", slug: "aura" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "locked" })
  })

  test("perk is locked until its unlock", () => {
    const s = ownedState(1)
    const { outcome } = applyIntent(s, { type: "perk", slug: "surge" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "locked" })
  })

  test("apotheosis is locked until its unlock", () => {
    const s = ownedState(1)
    const { outcome } = applyIntent(s, { type: "apotheosis" }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "locked" })
  })

  test("perk buys when unlocked and affordable", () => {
    const s = ownedState(1, { perksUnlocked: true, legacyStars: 10 })
    const { state, outcome } = applyIntent(s, { type: "perk", slug: "surge" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.perks).toContain("surge")
    expect(state.perkPointsSpent).toBe(2)
  })

  test("apotheosis converts stars to eternity when unlocked", () => {
    const s = ownedState(1, { apotheosisUnlocked: true, legacyStars: 100 })
    const { state, outcome } = applyIntent(s, { type: "apotheosis" }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.eternityPoints).toBe(2)
    expect(state.starsConverted).toBe(100)
  })
})
