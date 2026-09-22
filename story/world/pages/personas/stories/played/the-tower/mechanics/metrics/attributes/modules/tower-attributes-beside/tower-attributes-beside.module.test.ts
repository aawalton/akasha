import { expect, test } from "bun:test"
import {
  type Scored,
  scoresIn,
  scoresShown,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-attributes-beside/tower-attributes-beside.module.code.ts"

function rowOf(type: unknown, value: unknown): Scored {
  return { values: { type, slug: "the-tower-alan", value } }
}

test("an attribute is named by its own page type with the tower opening taken off", () => {
  expect(scoresIn([rowOf("tower-might", 14)])).toEqual({ MIGHT: 14 })
})

test("a row whose score is no number is left out", () => {
  expect(scoresIn([rowOf("tower-might", "14"), rowOf("tower-will", 20)])).toEqual({ WILL: 20 })
})

test("a row of a page type that does not open the tower way is left out", () => {
  expect(scoresIn([rowOf("skyshard-might", 14)])).toEqual({})
})

test("a row naming no page type is left out", () => {
  expect(scoresIn([rowOf(undefined, 14)])).toEqual({})
})

test("the scores come back in the order their names sort", () => {
  const held = scoresIn([rowOf("tower-will", 20), rowOf("tower-finesse", 14)])
  expect(Object.keys(held)).toEqual(["FINESSE", "WILL"])
})

test("the eight rows filed beside the tower player read as the sheet reads them", () => {
  const held = scoresIn([
    rowOf("tower-finesse", 14),
    rowOf("tower-intellect", 20),
    rowOf("tower-luck", 11),
    rowOf("tower-might", 14),
    rowOf("tower-perception", 12),
    rowOf("tower-presence", 16),
    rowOf("tower-vitality", 12),
    rowOf("tower-will", 20),
  ])
  expect(held).toEqual({
    FINESSE: 14,
    INTELLECT: 20,
    LUCK: 11,
    MIGHT: 14,
    PERCEPTION: 12,
    PRESENCE: 16,
    VITALITY: 12,
    WILL: 20,
  })
  expect(Object.keys(held)).toEqual([
    "FINESSE",
    "INTELLECT",
    "LUCK",
    "MIGHT",
    "PERCEPTION",
    "PRESENCE",
    "VITALITY",
    "WILL",
  ])
})

test("no row at all answers no score", () => {
  expect(scoresIn([])).toEqual({})
})

test("a read still outstanding with no score kept draws nothing at all", () => {
  expect(scoresShown(null, {})).toBe(null)
})

test("a read still outstanding draws the scores the sheet kept", () => {
  expect(scoresShown(null, { MIGHT: 14 })).toEqual({ MIGHT: 14 })
})

test("a read answering no score falls back to the scores the sheet kept", () => {
  expect(scoresShown({}, { MIGHT: 14 })).toEqual({ MIGHT: 14 })
})

test("a read answering no score with nothing kept draws an empty sheet rather than nothing", () => {
  expect(scoresShown({}, {})).toEqual({})
})

test("the scores filed beside the character are drawn over the scores the sheet kept", () => {
  expect(scoresShown({ MIGHT: 20 }, { MIGHT: 14 })).toEqual({ MIGHT: 20 })
})
