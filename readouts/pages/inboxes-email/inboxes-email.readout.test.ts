import { expect, test } from "bun:test"
import { answering, refusing } from "../../asking/readout-asking.module.test-fixtures.ts"
import { fetchLowestInbox, lowestIn, mailOn } from "./inboxes-email.readout.code.ts"

const DAY = "2026-09-02"

test("the page asked for is the day itself", () => {
  const asked = mailOn(DAY)
  expect(asked.pageTypeSlug).toBe("day")
  expect(asked.where).toEqual({ date: { is: DAY } })
  expect(asked.keys).toEqual(["lowestEmailInboxCount"])
  expect(asked.limit).toBe(1)
})

test("the reading is how near the inbox came to empty rather than where the inbox is now", () => {
  expect(mailOn(DAY).keys).toEqual(["lowestEmailInboxCount"])
})

test("a count stated as text is read as the number that count spells", () => {
  expect(lowestIn({ lowestEmailInboxCount: "9" })).toBe(9)
  expect(lowestIn({ lowestEmailInboxCount: 41 })).toBe(41)
})

test("a count of zero is a count", () => {
  expect(lowestIn({ lowestEmailInboxCount: "0" })).toBe(0)
  expect(lowestIn({ lowestEmailInboxCount: 0 })).toBe(0)
})

test("a day carrying no count is no reading rather than a count of zero", () => {
  expect(lowestIn({})).toBeNull()
  expect(lowestIn({ lowestEmailInboxCount: "" })).toBeNull()
  expect(lowestIn({ lowestEmailInboxCount: "   " })).toBeNull()
  expect(lowestIn({ lowestEmailInboxCount: "soon" })).toBeNull()
  expect(lowestIn({ lowestEmailInboxCount: null })).toBeNull()
})

test("the count is read under the key the page states rather than the slug it is filed by", () => {
  expect(lowestIn({ "lowest-email-inbox-count": 9 })).toBeNull()
})

test("no day written down is no reading rather than a count of zero", async () => {
  expect(await fetchLowestInbox(answering([]), DAY)).toBeNull()
})

test("a day carrying a count answers with that count", async () => {
  const answered = answering([{ values: { lowestEmailInboxCount: 9 } }])
  expect(await fetchLowestInbox(answered, DAY)).toBe(9)
})

test("a store that refuses is a fault rather than a reading of nothing", async () => {
  await expect(fetchLowestInbox(refusing("the store is down"), DAY)).rejects.toThrow(
    "unknown rather than none"
  )
})
