import { expect, test } from "bun:test"
import { WORDS_TO_THE_POINT, wisdomIn } from "./attribute-wisdom.readout.code.ts"

const held = (figure: unknown) => ({ "wisdom-words": figure })

test("the reading is the figure over the amount one point costs", () => {
  expect(WORDS_TO_THE_POINT).toBe(10000)
  expect(wisdomIn(held(10000))).toBeCloseTo(1, 10)
  expect(wisdomIn(held(10000 * 2))).toBeCloseTo(2, 10)
})

test("a figure given as text is read as the number that text spells", () => {
  expect(wisdomIn(held(String(10000)))).toBeCloseTo(1, 10)
})

test("a reading of zero is a reading rather than an absent one", () => {
  expect(wisdomIn(held(0))).toBe(0)
  expect(wisdomIn(held("0"))).toBe(0)
})

test("a day carrying no figure is no reading rather than a wisdom of zero", () => {
  expect(wisdomIn({})).toBeNull()
  expect(wisdomIn(held(null))).toBeNull()
  expect(wisdomIn(held(undefined))).toBeNull()
  expect(wisdomIn(held(""))).toBeNull()
  expect(wisdomIn(held("   "))).toBeNull()
  expect(wisdomIn(held("soon"))).toBeNull()
})
