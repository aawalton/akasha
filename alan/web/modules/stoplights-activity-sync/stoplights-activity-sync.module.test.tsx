import { expect, test } from "bun:test"
import { attributes } from "akasha/alan/harness/readout/group/pages/attributes/attributes.readout-group.ts"
import { inboxes } from "akasha/alan/harness/readout/group/pages/inboxes/inboxes.readout-group.ts"
import { upkeep } from "akasha/alan/harness/readout/group/pages/upkeep/upkeep.readout-group.ts"
import {
  type StoplightsContent,
  stoplightsOf,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"
import { contentIn } from "akasha/alan/web/modules/stoplights-activity-sync/stoplights-activity-sync.module.code.tsx"

const UPKEEP = [{ habit: "sleep", tier: "red" }]

const INBOXES = [{ inbox: "email", tier: "blue" }]

const ATTRIBUTES = [{ attribute: "strength", tier: "green" }]

const SLUGS = [upkeep.slug, inboxes.slug, attributes.slug]

function keysIn(content: StoplightsContent | null): readonly (string | undefined)[] {
  return content === null ? [] : SLUGS.map((slug) => stoplightsOf(content, slug)[0]?.key)
}

test("three groups that answered are one reading, each under its group's slug", () => {
  const content = contentIn([UPKEEP, INBOXES, ATTRIBUTES], "2026-09-19T17:00:00Z")
  expect(keysIn(content)).toEqual(["sleep", "email", "strength"])
})

test("a group that answered nothing leaves no reading to hand over", () => {
  expect(contentIn([UPKEEP, null, ATTRIBUTES], "2026-09-19T17:00:00Z")).toBe(null)
})

test("each feed's rows are read under the wire key name its group's page states", () => {
  const content = contentIn(
    [
      [{ [upkeep.wireKeyName]: "sleep", tier: "red" }],
      [{ [inboxes.wireKeyName]: "email", tier: "blue" }],
      [{ [attributes.wireKeyName]: "strength", tier: "green" }],
    ],
    "2026-09-19T17:00:00Z"
  )
  expect(keysIn(content)).toEqual(["sleep", "email", "strength"])
})

test("a group that answered an empty list is still a reading", () => {
  const content = contentIn([UPKEEP, [], ATTRIBUTES], "2026-09-19T17:00:00Z")
  expect(content?.[inboxes.slug]).toEqual([])
})
