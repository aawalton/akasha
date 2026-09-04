import { expect, test } from "bun:test"
import { answering, refusing } from "../../../readout-asking/readout-asking.module.test-fixtures.ts"
import { fetchLowestInbox, lowestIn, mailOn } from "./inboxes-email.readout.code.ts"

const DAY = "2026-09-02"

test("the mail entry asked for is the one the day names", () => {
  const asked = mailOn(DAY)
  expect(asked.pageTypeSlug).toBe("email-entry")
  expect(asked.where).toEqual({ date: { is: DAY } })
  expect(asked.keys).toEqual(["lowestInboxCount"])
  expect(asked.limit).toBe(1)
})

test("the reading is how near the inbox came to empty rather than where the inbox stands now", () => {
  expect(mailOn(DAY).keys).toEqual(["lowestInboxCount"])
})

test("a count stated as text is read as the number that count spells", () => {
  expect(lowestIn({ lowestInboxCount: "9" })).toBe(9)
  expect(lowestIn({ lowestInboxCount: 41 })).toBe(41)
})

test("a count of zero is a count", () => {
  expect(lowestIn({ lowestInboxCount: "0" })).toBe(0)
  expect(lowestIn({ lowestInboxCount: 0 })).toBe(0)
})

test("a mail entry carrying no count is no reading rather than a count of zero", () => {
  expect(lowestIn({})).toBeNull()
  expect(lowestIn({ lowestInboxCount: "" })).toBeNull()
  expect(lowestIn({ lowestInboxCount: "   " })).toBeNull()
  expect(lowestIn({ lowestInboxCount: "soon" })).toBeNull()
  expect(lowestIn({ lowestInboxCount: null })).toBeNull()
})

test("the count is read under the key the page states rather than the slug it is filed by", () => {
  expect(lowestIn({ "lowest-inbox-count": 9 })).toBeNull()
})

test("no mail entry is no reading rather than a count of zero", async () => {
  expect(await fetchLowestInbox(answering([]), DAY)).toBeNull()
})

test("a mail entry carrying a count answers with that count", async () => {
  expect(await fetchLowestInbox(answering([{ values: { lowestInboxCount: 9 } }]), DAY)).toBe(9)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchLowestInbox(refusing("the store is down"), DAY)).rejects.toThrow(
    "unknown rather than none"
  )
})
