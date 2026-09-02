import { expect, test } from "bun:test"
import { rowFor } from "./readout-asking.module.code.ts"
import { answering, refusing } from "./readout-asking.module.test-fixtures.ts"

const NOTHING_ASKED = {}

const FAULT = "the tracking day could not be read, so the count is unknown rather than none"

test("the first row an asking answers is the row read", async () => {
  const answered = answering([{ values: { count: "3" } }, { values: { count: "4" } }])
  expect(await rowFor(answered, NOTHING_ASKED, FAULT)).toEqual({ values: { count: "3" } })
})

test("an asking answering no row is no row rather than a fault", async () => {
  expect(await rowFor(answering([]), NOTHING_ASKED, FAULT)).toBeNull()
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(rowFor(refusing("the store is down"), NOTHING_ASKED, FAULT)).rejects.toThrow(FAULT)
})

test("a fault says what could not be read before what the store said", async () => {
  await expect(rowFor(refusing("the store is down"), NOTHING_ASKED, FAULT)).rejects.toThrow(
    `${FAULT}: the store is down`
  )
})
