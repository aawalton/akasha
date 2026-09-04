import { expect, test } from "bun:test"
import type { PoolSummary } from "../../../../claude-accounts/modules/selection/claude-account-selection.module.code.ts"
import {
  buildRateLimitRefusal,
  DEFAULT_RETRY_AFTER_SECONDS,
  MIN_RETRY_AFTER_SECONDS,
  rateLimitResponse,
  resetPhraseFor,
  retryAfterSecondsFor,
  UNKNOWN_RESET_PHRASE,
} from "./rate-limit-refusal.module.code.ts"

const NOW = 1_700_000_000_000

function summary(overrides: Partial<PoolSummary> = {}): PoolSummary {
  return { eligibleCount: 0, totalCount: 4, earliestEligibleResetMs: null, ...overrides }
}

test("a pool with no known reset waits the default span", () => {
  expect(retryAfterSecondsFor(summary(), NOW)).toBe(DEFAULT_RETRY_AFTER_SECONDS)
})

test("a reset already behind the moment waits the default span", () => {
  expect(retryAfterSecondsFor(summary({ earliestEligibleResetMs: NOW - 1 }), NOW)).toBe(
    DEFAULT_RETRY_AFTER_SECONDS
  )
})

test("a reset at the moment waits the default span", () => {
  expect(retryAfterSecondsFor(summary({ earliestEligibleResetMs: NOW }), NOW)).toBe(
    DEFAULT_RETRY_AFTER_SECONDS
  )
})

test("a reset ahead waits the seconds up to that reset", () => {
  expect(retryAfterSecondsFor(summary({ earliestEligibleResetMs: NOW + 30_000 }), NOW)).toBe(30)
})

test("a reset part of a second ahead is rounded up", () => {
  expect(retryAfterSecondsFor(summary({ earliestEligibleResetMs: NOW + 30_001 }), NOW)).toBe(31)
})

test("a reset a millisecond ahead waits the least span", () => {
  expect(retryAfterSecondsFor(summary({ earliestEligibleResetMs: NOW + 1 }), NOW)).toBe(
    MIN_RETRY_AFTER_SECONDS
  )
})

test("a pool with no known reset says the reset is unknown", () => {
  expect(resetPhraseFor(summary())).toBe(UNKNOWN_RESET_PHRASE)
})

test("a known reset is said as an iso moment", () => {
  expect(resetPhraseFor(summary({ earliestEligibleResetMs: NOW }))).toBe(
    `earliest limit reset at ${new Date(NOW).toISOString()}`
  )
})

test("a refusal is a 429", () => {
  expect(buildRateLimitRefusal(summary(), NOW).status).toBe(429)
})

test("a refusal names the rate limit error type", () => {
  expect(buildRateLimitRefusal(summary(), NOW).body.error.type).toBe("rate_limit_error")
})

test("a refusal names the eligible count against the total", () => {
  const built = buildRateLimitRefusal(summary({ eligibleCount: 1, totalCount: 7 }), NOW)
  expect(built.body.error.message).toContain("(1 of 7 accounts currently eligible)")
})

test("a refusal names the seconds to wait", () => {
  const built = buildRateLimitRefusal(summary({ earliestEligibleResetMs: NOW + 5_000 }), NOW)
  expect(built.body.error.message).toContain("Retry after 5s.")
})

test("a response carries the 429 status", () => {
  expect(rateLimitResponse(summary(), NOW).status).toBe(429)
})

test("a response carries `Too Many Requests` as its status text", () => {
  expect(rateLimitResponse(summary(), NOW).statusText).toBe("Too Many Requests")
})

test("a response is sent as json", () => {
  expect(rateLimitResponse(summary(), NOW).headers.get("content-type")).toBe("application/json")
})

test("a response carries the wait in a retry-after header", () => {
  const res = rateLimitResponse(summary({ earliestEligibleResetMs: NOW + 5_000 }), NOW)
  expect(res.headers.get("retry-after")).toBe("5")
})

test("a response body is the refusal built for the same pool", async () => {
  const res = rateLimitResponse(summary(), NOW)
  expect(await res.json()).toEqual(buildRateLimitRefusal(summary(), NOW).body)
})
