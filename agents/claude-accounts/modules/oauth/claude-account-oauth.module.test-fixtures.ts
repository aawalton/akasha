import {
  backoffExpiryMs,
  DEFAULT_AT_LIMIT_BACKOFF_MS,
  INITIAL_REPOLL_GATE_STATE,
  REPOLL_BREAKER_MS,
  REPOLL_MIN_INTERVAL_MS,
  type RefreshOutcome,
  type RepollDecision,
  type RepollGateState,
} from "akasha/agents/claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"

export type Same<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

export const FAKE_ACCESS_TOKEN = "FAKE-access-000000"

export const FAKE_REFRESH_TOKEN = "FAKE-refresh-00000"

export const FAKE_ACCOUNT_UUID = "11111111-2222-7333-8444-555555555555"

export const FAKE_ORG_UUID = "99999999-8888-7777-8666-555555555555"

export const NOW = 1_700_000_000_000

export const TOKEN_BODY = { access_token: FAKE_ACCESS_TOKEN, refresh_token: FAKE_REFRESH_TOKEN }

export const TOKEN_OK = { ...TOKEN_BODY, expires_in: 28_800 }

export const TOKEN_WITH_EXTRA_KEYS = {
  ...TOKEN_OK,
  token_type: "Bearer",
  scope: "user:inference user:profile",
}

export const USAGE_REALISTIC = {
  five_hour: { utilization: 12.5, resets_at: "2026-09-02T18:00:00Z" },
  seven_day: { utilization: 63, resets_at: "2026-09-06T00:00:00Z" },
}

export const USAGE_NULL_RESETS = {
  five_hour: { utilization: 0, resets_at: null },
  seven_day: { utilization: 0, resets_at: null },
}

export const USAGE_EXTRA_KEYS = {
  five_hour: { utilization: 12.5, resets_at: null, remaining: 4 },
  seven_day: { utilization: 63, resets_at: null },
  seven_day_opus: { utilization: 1, resets_at: null },
}

export const USAGE_NO_RESET_KEY = {
  five_hour: { utilization: 12.5 },
  seven_day: { utilization: 63, resets_at: null },
}

export const USAGE_ONE_WINDOW = { five_hour: { utilization: 12.5, resets_at: null } }

export const PROFILE_REALISTIC = {
  account: { uuid: FAKE_ACCOUNT_UUID, email: "fleet-07@example.invalid" },
}

export const PROFILE_EXTRA_KEYS = {
  account: { uuid: FAKE_ACCOUNT_UUID, has_claude_max: true },
  organization: { uuid: FAKE_ORG_UUID, name: "Fleet" },
}

export const PROFILE_WITH_PROTO: unknown = JSON.parse(
  `{"account":{"uuid":"${FAKE_ACCOUNT_UUID}"},"__proto__":{"polluted":1}}`
)

export const UNCLASSIFIED = { terminal: false, code: null, description: null }

export const ALLOW: RepollDecision = { kind: "allow" }

export const INITIAL = INITIAL_REPOLL_GATE_STATE

export const STALE_ATTEMPT: RepollGateState = {
  lastAttemptMs: NOW - 10 * REPOLL_MIN_INTERVAL_MS,
  breakerUntilMs: NOW + REPOLL_BREAKER_MS,
}

export const RECENT_ATTEMPT: RepollGateState = {
  lastAttemptMs: NOW - 30_000,
  breakerUntilMs: NOW - 1,
}

export const AT_EPOCH: RepollGateState = { lastAttemptMs: 0, breakerUntilMs: null }

export const FRESH_CREDENTIAL = {
  account: "acct-a",
  accessToken: FAKE_ACCESS_TOKEN,
  refreshToken: FAKE_REFRESH_TOKEN,
  expiresAt: NOW + 28_800_000,
  scopes: ["user:inference"],
  subscriptionType: "max",
  rateLimitTier: "tier-2",
} as const

export const WORKED: RefreshOutcome = { ok: true, credential: FRESH_CREDENTIAL }

export const FAILED: RefreshOutcome = {
  ok: false,
  terminal: true,
  reason: "http-error",
  status: 400,
  code: "invalid_grant",
  description: "expired",
}

export function backoffAt(header: string | null, fallback = DEFAULT_AT_LIMIT_BACKOFF_MS): number {
  return backoffExpiryMs({ now: NOW, retryAfterHeader: header }, fallback)
}

export function breakerSkip(seconds: number): RepollDecision {
  return { kind: "skip", reason: `usage-endpoint breaker open for another ${seconds}s` }
}

export function intervalSkip(seconds: number): RepollDecision {
  return { kind: "skip", reason: `re-polled ${seconds}s ago, inside the minimum interval` }
}

export const RETRYABLE: RefreshOutcome = { ok: false, terminal: false, reason: "exception" }

export const BARE: RefreshOutcome = { ok: false, terminal: false, reason: "no-credential" }

export const NO_TERMINAL_ON_A_WORKING_OUTCOME: Same<
  Extract<keyof Extract<RefreshOutcome, { ok: true }>, "terminal">,
  never
> = true

export const NO_CREDENTIAL_ON_A_FAILING_OUTCOME: Same<
  Extract<keyof Extract<RefreshOutcome, { ok: false }>, "credential">,
  never
> = true

export const STATUS_IS_OPTIONAL: Same<
  Pick<Extract<RefreshOutcome, { ok: false }>, "status">,
  { readonly status?: number | undefined }
> = true
