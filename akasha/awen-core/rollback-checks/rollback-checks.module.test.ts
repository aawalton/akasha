import { describe, expect, test } from "bun:test"
import {
  classifyEntity,
  earliestRollbackableTurn,
  validateRollbackInput,
} from "./rollback-checks.module.code.ts"

describe("classifyEntity", () => {
  test("an entity with a version at-or-before the anchor is restored", () => {
    expect(
      classifyEntity({ createdAtMs: 10, publishedAtNMs: 50, hasAtOrBeforeVersion: true })
    ).toBe("restore")
  })

  test("an entity made after the anchor with no such version is deleted", () => {
    expect(
      classifyEntity({ createdAtMs: 90, publishedAtNMs: 50, hasAtOrBeforeVersion: false })
    ).toBe("delete")
  })

  test("an entity older than the anchor with no such version is refused", () => {
    expect(
      classifyEntity({ createdAtMs: 10, publishedAtNMs: 50, hasAtOrBeforeVersion: false })
    ).toBe("refuse")
  })

  test("having the version wins over having been made later", () => {
    expect(
      classifyEntity({ createdAtMs: 90, publishedAtNMs: 50, hasAtOrBeforeVersion: true })
    ).toBe("restore")
  })
})

const GOOD_INPUT = {
  toTurn: 3,
  toTurnIsInteger: true,
  latestPublishedTurn: 7,
  publishedTurnsMissingTurnNumber: [] as readonly string[],
}

describe("validateRollbackInput", () => {
  test("a turn inside the published run passes", () => {
    expect(validateRollbackInput(GOOD_INPUT)).toEqual([])
  })

  test("a non-integer turn is refused", () => {
    const found = validateRollbackInput({ ...GOOD_INPUT, toTurn: 2.5, toTurnIsInteger: false })
    expect(found.map((v) => v.field)).toEqual(["--to-turn"])
  })

  test("a turn below one is refused", () => {
    expect(validateRollbackInput({ ...GOOD_INPUT, toTurn: 0 })).toHaveLength(1)
  })

  test("a turn at or past the latest published turn is refused", () => {
    expect(validateRollbackInput({ ...GOOD_INPUT, toTurn: 7 })).toHaveLength(1)
    expect(validateRollbackInput({ ...GOOD_INPUT, toTurn: 9 })).toHaveLength(1)
  })

  test("a game with no published turns is refused", () => {
    const found = validateRollbackInput({ ...GOOD_INPUT, latestPublishedTurn: null })
    expect(found.map((v) => v.field)).toEqual(["game"])
  })

  test("a published turn carrying no turn number is refused", () => {
    const found = validateRollbackInput({
      ...GOOD_INPUT,
      publishedTurnsMissingTurnNumber: ["turn-4"],
    })
    expect(found).toHaveLength(1)
    expect(found[0]?.message).toContain("turn-4")
  })

  test("a missing turn number is reported instead of the no-published-turns fault", () => {
    const found = validateRollbackInput({
      ...GOOD_INPUT,
      latestPublishedTurn: null,
      publishedTurnsMissingTurnNumber: ["turn-4"],
    })
    expect(found).toHaveLength(1)
    expect(found[0]?.message).toContain("turnNumber")
  })
})

describe("earliestRollbackableTurn", () => {
  const turns = [
    { turnNumber: 1, publishedAtMs: 100 },
    { turnNumber: 2, publishedAtMs: 300 },
    { turnNumber: 3, publishedAtMs: 400 },
    { turnNumber: 4, publishedAtMs: null },
  ]

  test("is the earliest published turn still covered by the version store", () => {
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: 250, latestPublishedTurn: 4, turns })
    ).toBe(2)
  })

  test("a turn at or past the latest published turn cannot be reached", () => {
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: 250, latestPublishedTurn: 3, turns })
    ).toBe(2)
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: 250, latestPublishedTurn: 2, turns })
    ).toBe(null)
  })

  test("nothing is reachable without a version floor", () => {
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: null, latestPublishedTurn: 4, turns })
    ).toBe(null)
  })

  test("nothing is reachable without a latest published turn", () => {
    expect(
      earliestRollbackableTurn({ oldestStateVersionMs: 100, latestPublishedTurn: null, turns })
    ).toBe(null)
  })
})
