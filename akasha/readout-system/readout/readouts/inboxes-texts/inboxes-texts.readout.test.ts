import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchUnreadTexts, textsIn, trackingOn } from "./inboxes-texts.readout.code.ts"

const DAY = "2026-09-02"

test("the day asked for is the tracking day named", () => {
  const asked = trackingOn(DAY)
  expect(asked["page-type"]).toBe("daily-tracking")
  expect(asked.where).toEqual({ date: { is: DAY } })
  expect(asked.keys).toEqual(["inbox-texts"])
  expect(asked.limit).toBe(1)
})

test("a count stated as text is read as the number that count spells", () => {
  expect(textsIn({ "inbox-texts": "2" })).toBe(2)
  expect(textsIn({ "inbox-texts": 9 })).toBe(9)
})

test("a count of zero is a count", () => {
  expect(textsIn({ "inbox-texts": "0" })).toBe(0)
  expect(textsIn({ "inbox-texts": 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(textsIn({})).toBeNull()
  expect(textsIn({ "inbox-texts": "" })).toBeNull()
  expect(textsIn({ "inbox-texts": "   " })).toBeNull()
  expect(textsIn({ "inbox-texts": "soon" })).toBeNull()
  expect(textsIn({ "inbox-texts": null })).toBeNull()
})

test("the task count standing beside it is never read as the text count", () => {
  expect(textsIn({ "inbox-tasks": "24" })).toBeNull()
})

test("no tracking day is no reading rather than a count of zero", async () => {
  expect(await fetchUnreadTexts(answering([]), DAY)).toBeNull()
})

test("a day carrying a count answers with that count", async () => {
  expect(await fetchUnreadTexts(answering([{ values: { "inbox-texts": 2 } }]), DAY)).toBe(2)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchUnreadTexts(refusing("the store is down"), DAY)).rejects.toThrow(
    "unknown rather than none"
  )
})
