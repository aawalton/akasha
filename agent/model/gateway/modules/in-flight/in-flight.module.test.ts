import { expect, test } from "bun:test"
import { buildInFlightTracker } from "akasha/agent/model/gateway/modules/in-flight/in-flight.module.code.ts"

test("a fresh tracker counts nothing", () => {
  expect(buildInFlightTracker().getCount()).toBe(0)
})

test("a tracker answers a begin, an end and a count and nothing else", () => {
  expect(Object.keys(buildInFlightTracker()).sort()).toEqual(["begin", "end", "getCount"])
})

test("beginning a request raises the count", () => {
  const tracker = buildInFlightTracker()
  tracker.begin()
  expect(tracker.getCount()).toBe(1)
  tracker.begin()
  expect(tracker.getCount()).toBe(2)
})

test("ending a request lowers the count", () => {
  const tracker = buildInFlightTracker()
  tracker.begin()
  tracker.begin()
  tracker.end()
  expect(tracker.getCount()).toBe(1)
})

test("an end met while the count is zero leaves the count at zero", () => {
  const tracker = buildInFlightTracker()
  tracker.end()
  expect(tracker.getCount()).toBe(0)
})

test("a count never falls below zero", () => {
  const tracker = buildInFlightTracker()
  tracker.begin()
  for (let each = 0; each < 5; each += 1) tracker.end()
  expect(tracker.getCount()).toBe(0)
  tracker.begin()
  expect(tracker.getCount()).toBe(1)
})

test("two trackers count apart from each other", () => {
  const one = buildInFlightTracker()
  const other = buildInFlightTracker()
  one.begin()
  one.begin()
  other.begin()
  expect(one.getCount()).toBe(2)
  expect(other.getCount()).toBe(1)
})
