import { expect, test } from "bun:test"
import { intelligenceIn, WORDS_TO_THE_POINT } from "./attribute-intelligence.readout.code.ts"

const held = (figure: unknown) => ({ "intelligence-words": figure })

test("the reading is the figure over the amount one point costs", () => {
  expect(WORDS_TO_THE_POINT).toBe(10000)
  expect(intelligenceIn(held(10000))).toBeCloseTo(1, 10)
  expect(intelligenceIn(held(10000 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(intelligenceIn(held(String(10000)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(intelligenceIn(held(0))).toBe(0)
  expect(intelligenceIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than an intelligence of zero", () => {
  expect(intelligenceIn({})).toBeNull()
  expect(intelligenceIn(held(null))).toBeNull()
  expect(intelligenceIn(held(undefined))).toBeNull()
  expect(intelligenceIn(held(""))).toBeNull()
  expect(intelligenceIn(held("   "))).toBeNull()
  expect(intelligenceIn(held("soon"))).toBeNull()
})
