import type { PoolSummary } from "../../../../claude-accounts/modules/selection/claude-account-selection.module.code.ts"

export const RATE_LIMIT_STATUS = 429

export const RATE_LIMIT_STATUS_TEXT = "Too Many Requests"

export const RATE_LIMIT_ERROR_TYPE = "rate_limit_error"

export const DEFAULT_RETRY_AFTER_SECONDS = 60

export const MIN_RETRY_AFTER_SECONDS = 1

export const UNKNOWN_RESET_PHRASE = "earliest reset unknown"

export type RateLimitErrorBody = {
  readonly type: "error"
  readonly error: { readonly type: "rate_limit_error"; readonly message: string }
}

export type RateLimitRefusal = {
  readonly status: 429
  readonly body: RateLimitErrorBody
  readonly retryAfterSeconds: number
}

export function retryAfterSecondsFor(summary: PoolSummary, now: number): number {
  const resetMs = summary.earliestEligibleResetMs
  if (resetMs === null || resetMs <= now) return DEFAULT_RETRY_AFTER_SECONDS
  return Math.max(MIN_RETRY_AFTER_SECONDS, Math.ceil((resetMs - now) / 1000))
}

export function resetPhraseFor(summary: PoolSummary): string {
  const resetMs = summary.earliestEligibleResetMs
  if (resetMs === null) return UNKNOWN_RESET_PHRASE
  return `earliest limit reset at ${new Date(resetMs).toISOString()}`
}

export function buildRateLimitRefusal(summary: PoolSummary, now: number): RateLimitRefusal {
  const seconds = retryAfterSecondsFor(summary, now)
  const message =
    `All Claude accounts are at their usage limit ` +
    `(${summary.eligibleCount} of ${summary.totalCount} accounts currently eligible); ` +
    `${resetPhraseFor(summary)}. Retry after ${seconds}s.`
  return {
    status: RATE_LIMIT_STATUS,
    body: { type: "error", error: { type: RATE_LIMIT_ERROR_TYPE, message } },
    retryAfterSeconds: seconds,
  }
}

export function rateLimitResponse(summary: PoolSummary, now: number): Response {
  const refusal = buildRateLimitRefusal(summary, now)
  return new Response(JSON.stringify(refusal.body), {
    status: refusal.status,
    statusText: RATE_LIMIT_STATUS_TEXT,
    headers: {
      "content-type": "application/json",
      "retry-after": String(refusal.retryAfterSeconds),
    },
  })
}
