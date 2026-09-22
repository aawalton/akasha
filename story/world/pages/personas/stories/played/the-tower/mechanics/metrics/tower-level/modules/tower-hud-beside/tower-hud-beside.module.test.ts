import { expect, test } from "bun:test"
import {
  type Counted,
  countIn,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-level/modules/tower-hud-beside/tower-hud-beside.module.code.ts"

function rowOf(type: string, value: unknown): Counted {
  return { values: { type, slug: "the-tower-alan", value } }
}

test("the level filed beside the tower player reads as the hud reads it", () => {
  expect(countIn([rowOf("tower-level", 7)])).toBe(7)
})

test("the attribute points filed beside the tower player read as the hud reads them", () => {
  expect(countIn([rowOf("tower-attribute-point", 3)])).toBe(3)
})

test("a count of nothing is answered as the number it is", () => {
  expect(countIn([rowOf("tower-attribute-point", 0)])).toBe(0)
})

test("a row whose count is no number is left out", () => {
  expect(countIn([rowOf("tower-level", "7")])).toBe(null)
})

test("a row stating no count is left out", () => {
  expect(countIn([rowOf("tower-level", undefined)])).toBe(null)
})

test("the first row carrying a number is the count answered", () => {
  expect(countIn([rowOf("tower-level", "7"), rowOf("tower-level", 7)])).toBe(7)
})

test("no row at all answers no count", () => {
  expect(countIn([])).toBe(null)
})
