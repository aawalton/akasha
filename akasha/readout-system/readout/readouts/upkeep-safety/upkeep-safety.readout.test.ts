import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchSafetyLevel, levelIn, OPEN_SESSION } from "./upkeep-safety.readout.code.ts"

test("the session asked for is the one that has not ended, latest first", () => {
  expect(OPEN_SESSION["page-type"]).toBe("session-tracking")
  expect(OPEN_SESSION.where).toEqual({ "end-time": { empty: true } })
  expect(OPEN_SESSION["sort-by"]).toBe("start-time")
  expect(OPEN_SESSION.descending).toBe(true)
  expect(OPEN_SESSION.limit).toBe(1)
})

test("a level stated as text is read as the number that level spells", () => {
  expect(levelIn({ "safety-level": "3" })).toBe(3)
  expect(levelIn({ "safety-level": "2.5" })).toBe(2.5)
  expect(levelIn({ "safety-level": "-1.5" })).toBe(-1.5)
  expect(levelIn({ "safety-level": -2 })).toBe(-2)
})

test("a level of zero is a level rather than an absent one", () => {
  expect(levelIn({ "safety-level": "0" })).toBe(0)
})

test("a session carrying no level is no reading rather than a level of zero", () => {
  expect(levelIn({})).toBeNull()
  expect(levelIn({ "safety-level": "" })).toBeNull()
  expect(levelIn({ "safety-level": "   " })).toBeNull()
  expect(levelIn({ "safety-level": "soon" })).toBeNull()
  expect(levelIn({ "safety-level": null })).toBeNull()
})

test("no open session is no reading rather than a level of zero", async () => {
  expect(await fetchSafetyLevel(answering([]))).toBeNull()
})

test("the level of the open session is the reading", async () => {
  expect(await fetchSafetyLevel(answering([{ values: { "safety-level": "2.5" } }]))).toBe(2.5)
})

test("an open session carrying no level is no reading", async () => {
  expect(await fetchSafetyLevel(answering([{ values: { title: "a block" } }]))).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchSafetyLevel(refusing("the index holds no such page type"))).rejects.toThrow(
    "unknown rather than nothing"
  )
})
