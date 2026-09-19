import { expect, test } from "bun:test"
import { contentIn } from "akasha/alan/web/modules/stoplights-activity-sync/stoplights-activity-sync.module.code.tsx"

const UPKEEP = [{ habit: "sleep", tier: "red" }]

const INBOXES = [{ inbox: "email", tier: "blue" }]

const ATTRIBUTES = [{ attribute: "strength", tier: "green" }]

test("three groups that answered are one reading", () => {
  const content = contentIn([UPKEEP, INBOXES, ATTRIBUTES], "2026-09-19T17:00:00Z")
  expect([content?.upkeep.length, content?.inboxes.length, content?.attributes.length]).toEqual([
    1, 1, 1,
  ])
})

test("a group that answered nothing leaves no reading to hand over", () => {
  expect(contentIn([UPKEEP, null, ATTRIBUTES], "2026-09-19T17:00:00Z")).toBe(null)
})

test("a group that answered an empty list is still a reading", () => {
  expect(contentIn([UPKEEP, [], ATTRIBUTES], "2026-09-19T17:00:00Z")?.inboxes).toEqual([])
})
