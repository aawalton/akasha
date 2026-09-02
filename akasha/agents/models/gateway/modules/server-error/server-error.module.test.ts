import { expect, test } from "bun:test"
import {
  classifyServerError,
  isServerError,
  MAX_RETRY_AFTER_MS,
  OVERLOADED_ERROR_TYPE,
  OVERLOADED_REASON,
  OVERLOADED_STATUS,
  RATE_LIMIT_STATUS,
  SERVER_ERROR_BACKOFF_MS,
  serverErrorBackoffMs,
} from "./server-error.module.code.ts"

const NO_ENVELOPE = "upstream said nothing parseable"

const OVERLOADED_BODY = JSON.stringify({
  type: "error",
  error: { type: "overloaded_error", message: "too many requests in flight" },
})

function envelope(type: string, message?: string): string {
  return JSON.stringify({
    type: "error",
    error: message === undefined ? { type } : { type, message },
  })
}

test("status 529 matches whatever the body carries", () => {
  expect(classifyServerError(529, NO_ENVELOPE).matched).toBe(true)
  expect(classifyServerError(529, "").matched).toBe(true)
  expect(classifyServerError(529, "[]").matched).toBe(true)
  expect(OVERLOADED_STATUS).toBe(529)
})

test("status 500, status 502 and status 503 match whatever the body carries", () => {
  expect(classifyServerError(500, NO_ENVELOPE).matched).toBe(true)
  expect(classifyServerError(502, "").matched).toBe(true)
  expect(classifyServerError(503, "null").matched).toBe(true)
})

test("a matched 529 with no envelope message reads overloaded (529)", () => {
  expect(classifyServerError(529, NO_ENVELOPE)).toEqual({
    matched: true,
    reason: "overloaded (529)",
  })
  expect(classifyServerError(529, envelope("overloaded_error"))).toEqual({
    matched: true,
    reason: "overloaded (529)",
  })
  expect(OVERLOADED_REASON).toBe("overloaded (529)")
})

test("a matched 500 with no envelope message reads internal server error (500)", () => {
  expect(classifyServerError(500, NO_ENVELOPE)).toEqual({
    matched: true,
    reason: "internal server error (500)",
  })
})

test("a matched 502 with no envelope message reads bad gateway (502)", () => {
  expect(classifyServerError(502, NO_ENVELOPE)).toEqual({
    matched: true,
    reason: "bad gateway (502)",
  })
})

test("a matched 503 with no envelope message reads service unavailable (503)", () => {
  expect(classifyServerError(503, NO_ENVELOPE)).toEqual({
    matched: true,
    reason: "service unavailable (503)",
  })
})

test("an envelope message replaces the reason the status alone would read", () => {
  expect(classifyServerError(500, envelope("api_error", "shard down"))).toEqual({
    matched: true,
    reason: "shard down",
  })
  expect(classifyServerError(529, envelope("overloaded_error", "at capacity"))).toEqual({
    matched: true,
    reason: "at capacity",
  })
})

test("the envelope error type is unread on a status this module matches by status", () => {
  expect(classifyServerError(503, envelope("teapot_error", "brewing"))).toEqual({
    matched: true,
    reason: "brewing",
  })
  expect(classifyServerError(529, envelope("not_found_error", "gone"))).toEqual({
    matched: true,
    reason: "gone",
  })
})

test("status 429 matches only an envelope naming overloaded_error", () => {
  expect(classifyServerError(429, OVERLOADED_BODY)).toEqual({
    matched: true,
    reason: "too many requests in flight",
  })
  expect(classifyServerError(429, envelope("rate_limit_error", "slow down"))).toEqual({
    matched: false,
  })
  expect(classifyServerError(429, NO_ENVELOPE)).toEqual({ matched: false })
  expect(classifyServerError(429, "{}")).toEqual({ matched: false })
  expect(RATE_LIMIT_STATUS).toBe(429)
})

test("a matched 429 with no envelope message reads overloaded_error", () => {
  expect(classifyServerError(429, envelope("overloaded_error"))).toEqual({
    matched: true,
    reason: "overloaded_error",
  })
  expect(OVERLOADED_ERROR_TYPE).toBe("overloaded_error")
})

test("a body carrying keys the envelope does not name still matches", () => {
  const extra = JSON.stringify({
    type: "error",
    request_id: "req_3",
    error: { type: "overloaded_error", message: "busy", retry_hint: 4 },
  })
  expect(classifyServerError(429, extra)).toEqual({ matched: true, reason: "busy" })
  expect(classifyServerError(500, extra)).toEqual({ matched: true, reason: "busy" })
})

test("a status outside 429, 500, 502, 503 and 529 matches nothing", () => {
  for (const status of [200, 400, 401, 403, 404, 413, 501, 504, 599]) {
    expect(classifyServerError(status, OVERLOADED_BODY)).toEqual({ matched: false })
  }
})

test("isServerError answers the matched flag classifyServerError returns", () => {
  expect(isServerError(503, NO_ENVELOPE)).toBe(true)
  expect(isServerError(429, OVERLOADED_BODY)).toBe(true)
  expect(isServerError(404, OVERLOADED_BODY)).toBe(false)
})

test("a Retry-After of whole seconds sets the backoff in milliseconds", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "3", attempt: 0, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(3000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: " 5 ", attempt: 2, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(5000)
})

test("a backoff read from Retry-After is capped at 8000 milliseconds", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "120", attempt: 0, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(8000)
  expect(MAX_RETRY_AFTER_MS).toBe(8000)
})

test("a Retry-After of zero or less reads the schedule instead", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "0", attempt: 1, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(2000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "-9", attempt: 1, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(2000)
})

test("a Retry-After the number parser refuses reads the schedule instead", () => {
  expect(
    serverErrorBackoffMs({
      retryAfterHeader: "soon",
      attempt: 0,
      schedule: SERVER_ERROR_BACKOFF_MS,
    })
  ).toBe(1000)
})

test("a blank Retry-After reads the schedule instead", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "", attempt: 2, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(4000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: "   ", attempt: 2, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(4000)
})

test("a backoff with no Retry-After reads the schedule at the attempt's index", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: 0, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(1000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: 1, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(2000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: 2, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(4000)
})

test("an attempt past the schedule's end reads the schedule's last entry", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: 3, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(4000)
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: 99, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(4000)
})

test("an empty schedule with no Retry-After backs off zero", () => {
  expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 0, schedule: [] })).toBe(0)
  expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 7, schedule: [] })).toBe(0)
})

test("the schedule is handed in rather than read off SERVER_ERROR_BACKOFF_MS", () => {
  expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 0, schedule: [250, 750] })).toBe(
    250
  )
  expect(serverErrorBackoffMs({ retryAfterHeader: null, attempt: 5, schedule: [250, 750] })).toBe(
    750
  )
  expect(SERVER_ERROR_BACKOFF_MS).toEqual([1000, 2000, 4000])
})

test("nothing here waits", () => {
  const before = Date.now()
  const backoff = serverErrorBackoffMs({
    retryAfterHeader: "8",
    attempt: 0,
    schedule: SERVER_ERROR_BACKOFF_MS,
  })
  expect(backoff).toBe(8000)
  expect(Date.now() - before).toBeLessThan(1000)
})

test("nothing here counts the attempts a caller has made", () => {
  const args = { retryAfterHeader: null, attempt: 1, schedule: SERVER_ERROR_BACKOFF_MS } as const
  expect(serverErrorBackoffMs(args)).toBe(2000)
  expect(serverErrorBackoffMs(args)).toBe(2000)
  expect(serverErrorBackoffMs(args)).toBe(2000)
})

test("an envelope message that is an empty string becomes an empty reason", () => {
  expect(classifyServerError(500, envelope("api_error", ""))).toEqual({ matched: true, reason: "" })
  expect(classifyServerError(529, envelope("overloaded_error", ""))).toEqual({
    matched: true,
    reason: "",
  })
  expect(classifyServerError(429, envelope("overloaded_error", ""))).toEqual({
    matched: true,
    reason: "",
  })
})

test("an attempt below zero backs off zero rather than the schedule's first entry", () => {
  expect(
    serverErrorBackoffMs({ retryAfterHeader: null, attempt: -1, schedule: SERVER_ERROR_BACKOFF_MS })
  ).toBe(0)
})

test("a fractional attempt backs off zero rather than a scheduled wait", () => {
  expect(
    serverErrorBackoffMs({
      retryAfterHeader: null,
      attempt: 1.5,
      schedule: SERVER_ERROR_BACKOFF_MS,
    })
  ).toBe(0)
})

test("a Retry-After holding an HTTP date reads the schedule instead", () => {
  expect(
    serverErrorBackoffMs({
      retryAfterHeader: "Wed, 21 Oct 2015 07:28:00 GMT",
      attempt: 0,
      schedule: SERVER_ERROR_BACKOFF_MS,
    })
  ).toBe(1000)
})

test("the Anthropic error envelope schema is declared here rather than in a module of its own", () => {
  expect(classifyServerError(429, OVERLOADED_BODY).matched).toBe(true)
  expect(
    classifyServerError(429, JSON.stringify({ type: "oops", error: { type: "overloaded_error" } }))
  ).toEqual({ matched: false })
})
