import { describe, expect, test } from "bun:test"
import {
  ACCOUNT_CARDS,
  CHARACTER_CARDS,
} from "../completion-card-registry/completion-card-registry.module.code.ts"
import {
  isCumulativeCard,
  isResettingCard,
} from "../completion-card-reset-behavior/completion-card-reset-behavior.module.code.ts"
import {
  CUMULATIVE_ACCOUNT_CARDS,
  CUMULATIVE_CHARACTER_CARDS,
} from "./completion-cumulative-cards.module.code.ts"

describe("the cumulative character cards", () => {
  test("the list is not empty, so every check below reads something", () => {
    expect(CUMULATIVE_CHARACTER_CARDS.length).toBeGreaterThan(0)
  })

  test("every card kept counts for all time and none of them starts over", () => {
    for (const card of CUMULATIVE_CHARACTER_CARDS) {
      expect(isResettingCard(card.id)).toBe(false)
      expect(isCumulativeCard(card.id)).toBe(true)
    }
  })

  test("daily writs leaves the list although the card registry holds it", () => {
    expect(CHARACTER_CARDS.some((card) => card.id === "daily-writs")).toBe(true)
    expect(CUMULATIVE_CHARACTER_CARDS.some((card) => card.id === "daily-writs")).toBe(false)
  })

  test("what the list keeps is what the registry keeps once the resetting cards go", () => {
    const kept = CHARACTER_CARDS.filter((card) => isCumulativeCard(card.id))
    expect(CUMULATIVE_CHARACTER_CARDS).toEqual(kept)
  })
})

describe("the cumulative account cards", () => {
  test("the list is not empty, so every check below reads something", () => {
    expect(CUMULATIVE_ACCOUNT_CARDS.length).toBeGreaterThan(0)
  })

  test("every card kept counts for all time and none of them starts over", () => {
    for (const card of CUMULATIVE_ACCOUNT_CARDS) {
      expect(isResettingCard(card.id)).toBe(false)
      expect(isCumulativeCard(card.id)).toBe(true)
    }
  })

  test("both antiquity lead cards leave the list", () => {
    expect(CUMULATIVE_ACCOUNT_CARDS.some((card) => card.id === "antiquity-leads-legendary")).toBe(
      false
    )
    expect(CUMULATIVE_ACCOUNT_CARDS.some((card) => card.id === "antiquity-leads-motifs")).toBe(
      false
    )
  })

  test("what the list keeps is what the registry keeps once the resetting cards go", () => {
    const kept = ACCOUNT_CARDS.filter((card) => isCumulativeCard(card.id))
    expect(CUMULATIVE_ACCOUNT_CARDS).toEqual(kept)
  })
})
