import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchLowestInbox, lowestIn, mailOn } from "./inboxes-email.readout.code.ts"

const DAY = "2026-09-02"

test("the mail entry asked for is the one the day names", () => {
  const asked = mailOn(DAY)
  expect(asked["page-type"]).toBe("email-entry")
  expect(asked.where).toEqual({ date: { is: DAY } })
  expect(asked.keys).toEqual(["lowest-inbox-count"])
  expect(asked.limit).toBe(1)
})

test("the reading is how near the inbox came to empty rather than where the inbox stands now", () => {
  expect(mailOn(DAY).keys).toEqual(["lowest-inbox-count"])
})

test("a count stated as text is read as the number that count spells", () => {
  expect(lowestIn({ "lowest-inbox-count": "9" })).toBe(9)
  expect(lowestIn({ "lowest-inbox-count": 41 })).toBe(41)
})

test("a count of zero is a count", () => {
  expect(lowestIn({ "lowest-inbox-count": "0" })).toBe(0)
  expect(lowestIn({ "lowest-inbox-count": 0 })).toBe(0)
})

test("a mail entry carrying no count is no reading rather than a count of zero", () => {
  expect(lowestIn({})).toBeNull()
  expect(lowestIn({ "lowest-inbox-count": "" })).toBeNull()
  expect(lowestIn({ "lowest-inbox-count": "   " })).toBeNull()
  expect(lowestIn({ "lowest-inbox-count": "soon" })).toBeNull()
  expect(lowestIn({ "lowest-inbox-count": null })).toBeNull()
})

test("no mail entry is no reading rather than a count of zero", async () => {
  expect(await fetchLowestInbox(answering([]), DAY)).toBeNull()
})

test("a mail entry carrying a count answers with that count", async () => {
  expect(await fetchLowestInbox(answering([{ values: { "lowest-inbox-count": 9 } }]), DAY)).toBe(9)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchLowestInbox(refusing("the store is down"), DAY)).rejects.toThrow(
    "unknown rather than none"
  )
})
