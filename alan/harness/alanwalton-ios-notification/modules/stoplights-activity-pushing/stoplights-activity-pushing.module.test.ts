import { expect, test } from "bun:test"
import {
  activityPayload,
  contentServedBy,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/stoplights-activity-pushing/stoplights-activity-pushing.module.code.ts"
import {
  GROUP,
  SERVED_BY,
  servingStore,
  storeGoes,
} from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.test-fixtures.ts"
import { stoplightsOf } from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"

const TAKEN_AT = "2026-09-19T17:00:00Z"

test("the groups carried are those whose pages name what serves them, each under its slug", async () => {
  const store = servingStore()
  try {
    const content = await contentServedBy(SERVED_BY, TAKEN_AT)
    expect(Object.keys(content).sort()).toEqual([GROUP, "takenAt"].sort())
    expect(stoplightsOf(content, GROUP).map((one) => one.key)).toEqual(["safety"])
    expect(content.takenAt).toBe(TAKEN_AT)
  } finally {
    storeGoes(store)
  }
})

test("what no group's page names carries no group", async () => {
  const store = servingStore()
  try {
    const content = await contentServedBy("route/a-route-no-group-names", TAKEN_AT)
    expect(Object.keys(content)).toEqual(["takenAt"])
  } finally {
    storeGoes(store)
  }
})

const CONTENT = {
  upkeep: [
    {
      key: "sleep",
      label: "Sleep",
      tier: "red",
      reading: "6.4",
      nextTier: null,
      progress: null,
      readingHeld: null,
    },
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
