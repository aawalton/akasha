import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { entriesBetween, fetchPlantGrams, gramsIn } from "./upkeep-plants.readout.code.ts"

const FROM = "2026-09-01T13:00:00.000Z"

const TO = "2026-09-02T13:00:00.000Z"

const ate = (grams: unknown) => ({ values: { id: "one", plantGrams: grams } })

test("the entries asked for are the food entries inside the window handed in", () => {
  const query = entriesBetween(FROM, TO) as Record<string, unknown>
  expect(query["pageTypeSlug"]).toBe("food-entry")
  expect(query.where).toEqual({ happenedAt: { "at-or-after": FROM, before: TO } })
})

test("the grams are asked for beside the id that names the entry", () => {
  expect((entriesBetween(FROM, TO) as Record<string, unknown>).keys).toEqual(["id", "plantGrams"])
})

test("the reading is every entry's grams added together", () => {
  expect(gramsIn([ate(30), ate(12), ate(8)])).toBe(50)
})

test("grams given as text are read as the number that text spells", () => {
  expect(gramsIn([ate("30"), ate("12.5")])).toBe(42.5)
})

test("an entry carrying no plant grams adds nothing to the total", () => {
  expect(gramsIn([ate(30), ate(undefined), ate(null), { values: { id: "two" } }])).toBe(30)
})

test("an entry whose grams spell no number adds nothing to the total", () => {
  expect(gramsIn([ate(30), ate(""), ate("   "), ate("some")])).toBe(30)
})

test("no entries at all is a reading of zero rather than no reading", () => {
  expect(gramsIn([])).toBe(0)
})

test("a day holding no food entry is answered as zero", async () => {
  expect(await fetchPlantGrams(answering([]), FROM, TO)).toBe(0)
})

test("the grams of the window asked for are the reading", async () => {
  expect(await fetchPlantGrams(answering([ate(100), ate("60")]), FROM, TO)).toBe(160)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(
    fetchPlantGrams(refusing("the index holds no such page type"), FROM, TO)
  ).rejects.toThrow("unknown rather than nothing")
})
