import { expect, test } from "bun:test"
import {
  constitutionIn,
  entriesBetween,
  fetchConstitutionPoints,
  GRAMS_TO_THE_POINT,
  gramsIn,
} from "akasha/alan/attribute/pages/constitution/constitution.attribute.code.ts"
import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import {
  answering,
  refusing,
} from "akasha/alan/harness/readout/modules/asking/readout-asking.module.test-fixtures.ts"

const FROM = "2026-09-01T13:00:00.000Z"

const TO = "2026-09-02T13:00:00.000Z"

function ate(grams: unknown): Row {
  return { values: { id: "one", plantGrams: grams } }
}

test("the entries asked for are the food entries inside the window handed in", () => {
  const query = entriesBetween(FROM, TO) as Record<string, unknown>
  expect(query["pageTypeSlug"]).toBe("food-entry")
  expect(query.where).toEqual({ happenedAt: { "at-or-after": FROM, before: TO } })
})

test("the grams are asked for beside the id that names the entry", () => {
  expect((entriesBetween(FROM, TO) as Record<string, unknown>).keys).toEqual(["id", "plantGrams"])
})

test("the grams are every entry's grams added together", () => {
  expect(gramsIn([ate(30), ate(12), ate(8)])).toBe(50)
})

test("an entry whose grams spell no number adds nothing to the grams", () => {
  expect(gramsIn([ate(30), ate(""), ate("   "), ate("some")])).toBe(30)
})

test("a hundred grams of whole plants eaten is one point", () => {
  expect(GRAMS_TO_THE_POINT).toBe(100)
  expect(constitutionIn(100)).toBeCloseTo(1, 10)
  expect(constitutionIn(320)).toBeCloseTo(3.2, 10)
})

test("the points are the grams of the window's food entries turned into points", async () => {
  expect(await fetchConstitutionPoints(answering([ate(100), ate("60")]), FROM, TO)).toBeCloseTo(
    1.6,
    10
  )
})

test("grams given as text are read as the number that text spells", async () => {
  expect(await fetchConstitutionPoints(answering([ate("250")]), FROM, TO)).toBeCloseTo(2.5, 10)
})

test("an entry carrying no plant grams adds nothing to the points", async () => {
  expect(
    await fetchConstitutionPoints(answering([ate(100), ate(null), ate("")]), FROM, TO)
  ).toBeCloseTo(1, 10)
})

test("a day holding no food entry earns zero rather than nothing", async () => {
  expect(await fetchConstitutionPoints(answering([]), FROM, TO)).toBe(0)
})

test("the figure a day carries under nutrition-points is no longer the source", async () => {
  const day = [{ values: { "nutrition-points": 5240 } }]
  expect(await fetchConstitutionPoints(answering(day), FROM, TO)).toBe(0)
})

test("a store that refuses is a fault rather than points of nothing", async () => {
  await expect(
    fetchConstitutionPoints(refusing("the index holds no such page type"), FROM, TO)
  ).rejects.toThrow("unknown rather than nothing")
})
