import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import {
  constitutionIn,
  fetchConstitutionPoints,
  GRAMS_TO_THE_POINT,
} from "./attribute-constitution.readout.code.ts"

const FROM = "2026-09-01T13:00:00.000Z"

const TO = "2026-09-02T13:00:00.000Z"

const ate = (grams: unknown) => ({ values: { id: "one", "plant-grams": grams } })

test("a hundred grams of whole plants eaten is one point", () => {
  expect(GRAMS_TO_THE_POINT).toBe(100)
  expect(constitutionIn(100)).toBeCloseTo(1, 10)
  expect(constitutionIn(320)).toBeCloseTo(3.2, 10)
})

test("the reading is the grams of the window's food entries turned into points", async () => {
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

test("a day holding no food entry is a reading of zero rather than no reading", async () => {
  expect(await fetchConstitutionPoints(answering([]), FROM, TO)).toBe(0)
})

test("the figure a day carries under nutrition-points is no longer the source", async () => {
  const day = [{ values: { "nutrition-points": 5240 } }]
  expect(await fetchConstitutionPoints(answering(day), FROM, TO)).toBe(0)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchConstitutionPoints(refusing("the index holds no such page type"), FROM, TO)
  ).rejects.toThrow("unknown rather than nothing")
})
