import { expect, test } from "bun:test"
import { activityPayload } from "akasha/alan/harness/alanwalton-ios-notification/modules/stoplights-activity-pushing/stoplights-activity-pushing.module.code.ts"

const CONTENT = {
  upkeep: [
    { key: "sleep", label: "Sleep", tier: "red", reading: "6.4", nextTier: null, progress: null },
  ],
  inboxes: [],
  attributes: [],
  takenAt: "2026-09-19T17:00:00Z",
}

test("the reading rides under the key ActivityKit reads it at", () => {
  const aps = activityPayload(CONTENT, 1_758_301_200) as {
    aps: { event: string; timestamp: number; "content-state": unknown }
  }
  expect([aps.aps.event, aps.aps.timestamp, aps.aps["content-state"]]).toEqual([
    "update",
    1_758_301_200,
    CONTENT,
  ])
})

test("nothing an alert carries rides along", () => {
  const aps = activityPayload(CONTENT, 1) as { aps: Record<string, unknown> }
  expect(Object.keys(aps.aps).sort()).toEqual(["content-state", "event", "timestamp"])
})
