import { expect, test } from "bun:test"
import {
  type Counted,
  countIn,
  levelShown,
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

test("a read still outstanding with no level kept draws nothing at all", () => {
  expect(levelShown(null, undefined)).toBe(null)
})

test("a read still outstanding draws the level the panel kept", () => {
  expect(levelShown(null, 3)).toBe(3)
})

test("a read answering no level falls back to the level the panel kept", () => {
  expect(levelShown({ level: null, attributePoints: null }, 3)).toBe(3)
})

test("a read answering no level with nothing kept draws nothing at all", () => {
  expect(levelShown({ level: null, attributePoints: null }, undefined)).toBe(null)
})

test("the level filed beside the character is drawn over the level the panel kept", () => {
  expect(levelShown({ level: 7, attributePoints: 3 }, 3)).toBe(7)
})

test("a level of nothing filed beside the character is drawn as the number it is", () => {
  expect(levelShown({ level: 0, attributePoints: 0 }, 3)).toBe(0)
})
