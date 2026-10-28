import { expect, test } from "bun:test"
import { day } from "akasha/alan/track/daily/day/day.page-type.ts"
import {
  activityOf,
  hoursOf,
  logsOf,
  openedBefore,
  strengthSetsOf,
} from "akasha/command/pages/medicine/modules/health-logs/health-logs.module.code.ts"

const on = (date: string) => `${day.slug}/day-${date}`

test("a strength set counts in its window, and warm-ups, mobility and cardio sets do not", () => {
  const sets = [
    { day: on("2026-08-01") },
    { day: on("2026-08-01"), isWarmup: true },
    { day: on("2026-08-01"), activityType: "mobility" },
    { day: on("2026-08-01"), activityType: "cardio" },
    { day: on("2026-07-01") },
  ]
  expect(strengthSetsOf(sets, "2026-07-28", "2026-10-28")).toBe(1)
  const logs = logsOf("2026-07-28", "2026-10-28", [], [], 92 / 7)
  expect(logs.strengthSetsPerWeek).toBeCloseTo(1)
})

test("the window opens three months before the day it ends on", () => {
  expect(openedBefore("2026-10-28")).toBe("2026-07-28")
})

test("a day's activity is the source that counted the most", () => {
  const held = activityOf([
    { metric: "stepCount", value: 100, sourceName: "watch" },
    { metric: "stepCount", value: 60, sourceName: "phone" },
    { metric: "activeEnergy", value: 5, sourceName: "watch" },
  ])
  expect(held).toEqual({ activeEnergy: 5, steps: 100 })
})

test("a day's hours count sleep and the time spent under each safety line", () => {
  const held = hoursOf([
    {
      title: "Sleep",
      startedAt: "2026-10-01T00:00:00Z",
      endedAt: "2026-10-01T08:00:00Z",
      safetyLevel: "3",
    },
    {
      title: "Read",
      startedAt: "2026-10-01T08:00:00Z",
      endedAt: "2026-10-01T10:00:00Z",
      safetyLevel: "-1",
    },
    { title: "Read", startedAt: "2026-10-01T10:00:00Z", safetyLevel: "-1" },
  ])
  expect(held).toEqual({
    sleptMinutes: 480,
    loggedMinutes: 600,
    belowThreeMinutes: 120,
    belowZeroMinutes: 120,
  })
})

test("a day under 100 kilocalories is read as a day the watch was off", () => {
  const logs = logsOf(
    "2026-07-28",
    "2026-10-28",
    [
      { activeEnergy: 50, steps: 100 },
      { activeEnergy: 400, steps: 9000 },
    ],
    []
  )
  expect(logs.wornDays).toBe(1)
  expect(logs.steps).toBe(9000)
  expect(logs.sleepHours).toBeNull()
})
