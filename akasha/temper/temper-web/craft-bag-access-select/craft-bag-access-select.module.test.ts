import { describe, expect, test } from "bun:test"
import {
  type CraftBagAccessValue,
  fromCraftBagAccessValue,
  toCraftBagAccessValue,
} from "./craft-bag-access-select.module.code.ts"

describe("toCraftBagAccessValue", () => {
  test("an unanswered setting renders as the unset sentinel, never as an answer", () => {
    const value = toCraftBagAccessValue(undefined)
    expect(value).toBe("no-eso-plus-answer")
    expect(value).not.toBe("true")
  })

  test("renders a real answer once the user has given one", () => {
    expect(toCraftBagAccessValue(true)).toBe("true")
    expect(toCraftBagAccessValue(false)).toBe("false")
  })
})

describe("fromCraftBagAccessValue", () => {
  test("choosing the sentinel clears the answer rather than storing a boolean", () => {
    expect(fromCraftBagAccessValue("no-eso-plus-answer")).toBeUndefined()
  })

  test("round-trips every state, so the row cannot silently change the stored answer", () => {
    for (const state of [true, false, undefined]) {
      expect(fromCraftBagAccessValue(toCraftBagAccessValue(state))).toBe(state)
    }
  })

  test("maps the two answers to booleans", () => {
    const cases: ReadonlyArray<[CraftBagAccessValue, boolean]> = [
      ["true", true],
      ["false", false],
    ]
    for (const [value, expected] of cases) {
      expect(fromCraftBagAccessValue(value)).toBe(expected)
    }
  })
})
