import { expect, test } from "bun:test"
import {
  COOLDOWN_MS,
  judgeCrashPaging,
  judgeLiveness,
  judgeLivenessPaging,
  scanLogText,
} from "./watcher-liveness.module.code.ts"

const NONE = { lastHealthyMs: null, lastFatalMs: null }

test("a heartbeat fresher than the threshold reads as healthy whatever else is true", () => {
  expect(
    judgeLiveness({ lastHealthyAgeMs: 1000, unitActive: false, stalenessMs: 600_000 })
  ).toEqual({ healthy: true, reason: "ok" })
})

test("a stale heartbeat is stalled under a live unit and down under a dead one", () => {
  expect(
    judgeLiveness({ lastHealthyAgeMs: 700_000, unitActive: true, stalenessMs: 600_000 })
  ).toEqual({ healthy: false, reason: "stalled" })
  expect(
    judgeLiveness({ lastHealthyAgeMs: 700_000, unitActive: false, stalenessMs: 600_000 })
  ).toEqual({ healthy: false, reason: "down" })
})

test("no heartbeat at all is no reason to read the watcher as healthy", () => {
  expect(judgeLiveness({ lastHealthyAgeMs: null, unitActive: true, stalenessMs: 600_000 })).toEqual(
    {
      healthy: false,
      reason: "stalled",
    }
  )
})

test("a healthy watcher clears the last-paged moment", () => {
  expect(
    judgeLivenessPaging({ healthy: true, priorPagedAtMs: 5, nowMs: 10, cooldownMs: COOLDOWN_MS })
  ).toEqual({ page: false, nextPagedAtMs: null })
})

test("a watcher that stays down is said once a cooldown rather than once a tick", () => {
  const first = judgeLivenessPaging({
    healthy: false,
    priorPagedAtMs: null,
    nowMs: 1000,
    cooldownMs: 100,
  })
  expect(first).toEqual({ page: true, nextPagedAtMs: 1000 })
  expect(
    judgeLivenessPaging({ healthy: false, priorPagedAtMs: 1000, nowMs: 1050, cooldownMs: 100 })
  ).toEqual({ page: false, nextPagedAtMs: 1000 })
  expect(
    judgeLivenessPaging({ healthy: false, priorPagedAtMs: 1000, nowMs: 1100, cooldownMs: 100 })
  ).toEqual({ page: true, nextPagedAtMs: 1100 })
})

test("a fatal no newer than the one already paged for pages nobody", () => {
  expect(judgeCrashPaging({ latestFatalMs: null, priorPagedAtMs: 7, cooldownMs: 100 })).toEqual({
    page: false,
    nextPagedAtMs: 7,
  })
  expect(judgeCrashPaging({ latestFatalMs: 7, priorPagedAtMs: 7, cooldownMs: 100 })).toEqual({
    page: false,
    nextPagedAtMs: 7,
  })
  expect(judgeCrashPaging({ latestFatalMs: 7, priorPagedAtMs: null, cooldownMs: 100 })).toEqual({
    page: true,
    nextPagedAtMs: 7,
  })
  expect(judgeCrashPaging({ latestFatalMs: 200, priorPagedAtMs: 7, cooldownMs: 100 })).toEqual({
    page: true,
    nextPagedAtMs: 200,
  })
})

test("the newest healthy heartbeat and the newest fatal are read out of one text", () => {
  const found = scanLogText(
    [
      "2026-08-30T00:00:01.000Z INFO Realtime health: SUBSCRIBED (healthy)",
      "2026-08-30T00:00:02.000Z ERROR FATAL the worker died",
      "2026-08-30T00:00:03.000Z INFO Realtime health: SUBSCRIBED (healthy)",
      "not a line at all",
    ].join("\n"),
    NONE
  )
  expect(found.lastHealthyMs).toBe(Date.parse("2026-08-30T00:00:03.000Z"))
  expect(found.lastFatalMs).toBe(Date.parse("2026-08-30T00:00:02.000Z"))
})

test("a text holding neither signal leaves what was already found alone", () => {
  expect(scanLogText("2026-08-30T00:00:09.000Z INFO nothing of note", NONE)).toEqual(NONE)
})
