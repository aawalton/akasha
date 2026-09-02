import { z } from "zod"
import type { OAuthCredential } from "../../../models/gateway/modules/oauth-types/oauth-types.module.code.ts"

export const OAUTH_TOKEN_URL = "https://platform.claude.com/v1/oauth/token"

export const OAUTH_CLIENT_ID = "9d1c250a-e61b-44d9-88ed-5944d1962f5e"

export const USAGE_URL = "https://api.anthropic.com/api/oauth/usage"

export const PROFILE_URL = "https://api.anthropic.com/api/oauth/profile"

export const REFRESH_BUFFER_MS = 5 * 60 * 1000

export const UPKEEP_PERIOD_MS = 60 * 60 * 1000

export const UPKEEP_RENEWAL_MARGIN_MS = 3 * 60 * 60 * 1000

export type RefreshOutcome =
  | { readonly ok: true; readonly credential: OAuthCredential }
  | {
      readonly ok: false
      readonly terminal: boolean
      readonly reason: "no-credential" | "http-error" | "exception"
      readonly status?: number
      readonly code?: string | null
      readonly description?: string | null
      readonly error?: unknown
    }

export const OAUTH_TOKEN_RESPONSE_SCHEMA = z.looseObject({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_in: z.number(),
})

const OAUTH_ERROR_ENVELOPE_SCHEMA = z.looseObject({
  error: z.string().optional(),
  error_description: z.string().optional(),
})

const USAGE_WINDOW_SCHEMA = z.looseObject({
  utilization: z.number(),
  resets_at: z.string().nullable(),
})

export const USAGE_RESPONSE_SCHEMA = z.looseObject({
  five_hour: USAGE_WINDOW_SCHEMA,
  seven_day: USAGE_WINDOW_SCHEMA,
})

export const PROFILE_RESPONSE_SCHEMA = z.looseObject({
  account: z.looseObject({
    uuid: z.string().min(1),
    email: z.string().optional(),
  }),
})

const TERMINAL_OAUTH_ERROR_CODES = new Set(["invalid_grant", "invalid_client"])

const CLIENT_ERROR_FLOOR = 400

const SERVER_ERROR_FLOOR = 500

const RATE_LIMIT_STATUS = 429

type OAuthErrorClassification = {
  terminal: boolean
  code: string | null
  description: string | null
}

const UNCLASSIFIED: OAuthErrorClassification = {
  terminal: false,
  code: null,
  description: null,
}

export function classifyOAuthError(status: number, body: string): OAuthErrorClassification {
  if (status >= SERVER_ERROR_FLOOR) return { ...UNCLASSIFIED }
  if (status === RATE_LIMIT_STATUS) {
    return { terminal: false, code: "rate_limited", description: null }
  }

  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return { ...UNCLASSIFIED }
  }

  const parsed = OAUTH_ERROR_ENVELOPE_SCHEMA.safeParse(payload)
  if (!parsed.success) return { ...UNCLASSIFIED }

  const code = parsed.data.error ?? null
  const description = parsed.data.error_description ?? null
  const terminal =
    status >= CLIENT_ERROR_FLOOR &&
    status < SERVER_ERROR_FLOOR &&
    code !== null &&
    TERMINAL_OAUTH_ERROR_CODES.has(code)
  return { terminal, code, description }
}

export const DEFAULT_AT_LIMIT_BACKOFF_MS = 5_000

export const MAX_AT_LIMIT_BACKOFF_MS = 5 * 3_600_000

type AtLimitExpiryArgs = {
  now: number
  retryAfterHeader: string | null
}

function parseRetryAfterMs(header: string | null): number | null {
  if (header == null || header.trim() === "") return null
  const seconds = Number(header)
  if (!Number.isFinite(seconds) || seconds <= 0) return null
  return seconds * 1000
}

export function backoffExpiryMs(
  args: AtLimitExpiryArgs,
  defaultBackoffMs: number = DEFAULT_AT_LIMIT_BACKOFF_MS
): number {
  const retryAfterMs = parseRetryAfterMs(args.retryAfterHeader)
  if (retryAfterMs != null) return args.now + Math.min(retryAfterMs, MAX_AT_LIMIT_BACKOFF_MS)
  return args.now + defaultBackoffMs
}

export const REPOLL_MIN_INTERVAL_MS = 60_000

export const REPOLL_BREAKER_MS = 300_000

const MS_A_SECOND = 1000

export type RepollGateState = {
  readonly lastAttemptMs: number | null
  readonly breakerUntilMs: number | null
}

export const INITIAL_REPOLL_GATE_STATE: RepollGateState = {
  lastAttemptMs: null,
  breakerUntilMs: null,
}

export type RepollDecision =
  | { readonly kind: "allow" }
  | { readonly kind: "skip"; readonly reason: string }

export function decideUsageRepoll(state: RepollGateState, now: number): RepollDecision {
  if (state.breakerUntilMs != null && now < state.breakerUntilMs) {
    const seconds = Math.ceil((state.breakerUntilMs - now) / MS_A_SECOND)
    return { kind: "skip", reason: `usage-endpoint breaker open for another ${seconds}s` }
  }
  if (state.lastAttemptMs != null && now - state.lastAttemptMs < REPOLL_MIN_INTERVAL_MS) {
    const sinceLast = now - state.lastAttemptMs
    const seconds = Math.ceil((REPOLL_MIN_INTERVAL_MS - sinceLast) / MS_A_SECOND)
    return { kind: "skip", reason: `re-polled ${seconds}s ago, inside the minimum interval` }
  }
  return { kind: "allow" }
}

export function recordRepollAttempt(state: RepollGateState, now: number): RepollGateState {
  return { ...state, lastAttemptMs: now }
}

export function recordUsageRateLimited(state: RepollGateState, now: number): RepollGateState {
  return { ...state, lastAttemptMs: now, breakerUntilMs: now + REPOLL_BREAKER_MS }
}
