import { describe, expect, test } from "bun:test"
import { getEsoDayWindow } from "@shared/recurrence/reset-times"
import { type SleepBlockInput, wakeInstantFromBlocks } from "./wake-day"

function sleep(startTime: string, endTime: string): SleepBlockInput {
  return { title: "Sleep", startTime, endTime }
}

const REAL_LOG: Readonly<Record<string, readonly SleepBlockInput[]>> = {
  "2026-08-01": [sleep("2026-08-01T04:45:00.000Z", "2026-08-01T09:06:00.000Z")],
  "2026-08-02": [
    sleep("2026-08-01T21:45:00.000Z", "2026-08-02T03:50:00.000Z"),
    sleep("2026-08-02T04:45:00.000Z", "2026-08-02T10:29:15.545Z"),
  ],
  "2026-08-03": [sleep("2026-08-03T01:36:36.022Z", "2026-08-03T10:28:27.166Z")],
  "2026-08-04": [
    sleep("2026-08-03T20:55:07.998Z", "2026-08-03T23:27:57.921Z"),
    sleep("2026-08-04T03:10:00.000Z", "2026-08-04T09:30:00.000Z"),
  ],
  "2026-08-05": [
    sleep("2026-08-05T02:30:50.042Z", "2026-08-05T11:39:57.646Z"),
    sleep("2026-08-06T02:45:00.000Z", "2026-08-06T05:45:00.000Z"),
    sleep("2026-08-06T08:10:28.882Z", "2026-08-06T12:03:29.978Z"),
  ],
  "2026-08-06": [],
  "2026-08-07": [
    sleep("2026-08-07T03:30:00.000Z", "2026-08-07T10:09:22.955Z"),
    sleep("2026-08-07T11:23:31.050Z", "2026-08-07T14:44:20.145Z"),
  ],
}

describe("wakeInstantFromBlocks", () => {
  test("a morning nap after the wake does not become the day's start", () => {
    const wake = wakeInstantFromBlocks(REAL_LOG["2026-08-07"] ?? [], getEsoDayWindow("2026-08-07"))
    expect(wake?.toISOString()).toBe("2026-08-07T10:09:22.955Z")
  })

  test("a previous evening's nap does not become the day's start", () => {
    const wake = wakeInstantFromBlocks(REAL_LOG["2026-08-02"] ?? [], getEsoDayWindow("2026-08-02"))
    expect(wake?.toISOString()).toBe("2026-08-02T10:29:15.545Z")
  })

  test("a following night attributed to this day does not become the day's start", () => {
    const wake = wakeInstantFromBlocks(REAL_LOG["2026-08-05"] ?? [], getEsoDayWindow("2026-08-05"))
    expect(wake?.toISOString()).toBe("2026-08-05T11:39:57.646Z")
  })

  test("waking before the day's window opens yields no instant, so the caller falls back", () => {
    const wake = wakeInstantFromBlocks(REAL_LOG["2026-08-04"] ?? [], getEsoDayWindow("2026-08-04"))
    expect(wake).toBeNull()
  })

  const NO_WAKE_CASES: [string, SleepBlockInput[]][] = [
    ["no blocks", []],
    [
      "a session that is not Sleep",
      [{ title: "Deep Work", startTime: "2026-08-07T11:00:00Z", endTime: "2026-08-07T13:00:00Z" }],
    ],
    [
      "an open block — Alan asleep right now",
      [{ title: "Sleep", startTime: "2026-08-07T11:00:00Z", endTime: null }],
    ],
    ["an unparseable instant", [sleep("not-a-date", "2026-08-07T11:00:00Z")]],
    ["a non-positive span", [sleep("2026-08-07T13:00:00Z", "2026-08-07T12:00:00Z")]],
  ]

  test.each(NO_WAKE_CASES)("yields no instant for %s", (_label, blocks) => {
    expect(wakeInstantFromBlocks(blocks, getEsoDayWindow("2026-08-07"))).toBeNull()
  })

  test("THE TILING PROPERTY: consecutive days are strictly increasing, so no window is empty or negative", () => {
    const days = Object.keys(REAL_LOG).sort()
    const wakes = days.map((dayStr) => {
      const esoWindow = getEsoDayWindow(dayStr)
      const wake = wakeInstantFromBlocks(REAL_LOG[dayStr] ?? [], esoWindow)
      return (wake ?? esoWindow.start).getTime()
    })
    let previous: number | null = null
    for (const wake of wakes) {
      if (previous !== null) expect(wake).toBeGreaterThan(previous)
      previous = wake
    }
  })
})
