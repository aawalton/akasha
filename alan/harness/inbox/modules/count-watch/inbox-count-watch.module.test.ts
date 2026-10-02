import { expect, test } from "bun:test"
import {
  FIRST_WAIT_MS,
  LONGEST_WAIT_MS,
  unanswered,
  WAITED_AT_MOST_MS,
  waitAfter,
} from "akasha/alan/harness/inbox/modules/count-watch/inbox-count-watch.module.code.ts"

const TIMED_OUT = new DOMException("The operation timed out.", "TimeoutError")

const REFUSED = Object.assign(
  new Error("Unable to connect. Is the computer able to access the url?"),
  {
    code: "ConnectionRefused",
  }
)

test("a take that timed out is taken again after waits that grow", () => {
  const waits = [1, 2, 3, 4, 5, 6, 7].map((tried) => waitAfter(TIMED_OUT, tried, 0))
  expect(waits).toEqual([2_000, 4_000, 8_000, 16_000, 30_000, 30_000, 30_000])
})

test("the first wait is the shortest and no wait is longer than the longest", () => {
  expect(waitAfter(TIMED_OUT, 1, 0)).toBe(FIRST_WAIT_MS)
  expect(waitAfter(TIMED_OUT, 40, 0)).toBe(LONGEST_WAIT_MS)
})

test("a take that could not connect is waited on as one that timed out is", () => {
  expect(waitAfter(REFUSED, 1, 0)).toBe(FIRST_WAIT_MS)
  expect(waitAfter(Object.assign(new Error("connect"), { code: "ECONNREFUSED" }), 2, 0)).toBe(4_000)
})

test("pages unanswered past the warm-up end the run, so an outage still raises an alarm", () => {
  expect(waitAfter(TIMED_OUT, 11, WAITED_AT_MOST_MS - 1)).toBe(LONGEST_WAIT_MS)
  expect(waitAfter(TIMED_OUT, 12, WAITED_AT_MOST_MS)).toBeNull()
  expect(waitAfter(REFUSED, 12, WAITED_AT_MOST_MS + 60_000)).toBeNull()
})

test("any other throw ends the run at once", () => {
  expect(waitAfter(new Error("reading daily-tracking for 2026-10-02: refused"), 1, 0)).toBeNull()
  expect(waitAfter(new TypeError("fetch failed"), 1, 0)).toBeNull()
  expect(waitAfter(null, 1, 0)).toBeNull()
  expect(waitAfter("TimeoutError", 1, 0)).toBeNull()
})

test("a wait is known by the error's name or code rather than by what its message says", () => {
  expect(unanswered(new Error("The operation timed out."))).toBe(false)
  expect(unanswered(Object.assign(new Error("x"), { code: "ConnectionClosed" }))).toBe(false)
  expect(unanswered(TIMED_OUT)).toBe(true)
  expect(unanswered(REFUSED)).toBe(true)
})
