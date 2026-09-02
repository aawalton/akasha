import {
  backoffExpiryMs,
  DEFAULT_AT_LIMIT_BACKOFF_MS,
  INITIAL_REPOLL_GATE_STATE,
  type RefreshOutcome,
  type RepollDecision,
} from "./claude-account-oauth.module.code.ts"

export type Same<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

export const FAKE_ACCESS_TOKEN = "FAKE-access-000000"

export const FAKE_REFRESH_TOKEN = "FAKE-refresh-00000"

export const FAKE_ACCOUNT_UUID = "11111111-2222-7333-8444-555555555555"

export const FAKE_ORG_UUID = "99999999-8888-7777-8666-555555555555"

export const NOW = 1_700_000_000_000

export const TOKEN_BODY = { access_token: FAKE_ACCESS_TOKEN, refresh_token: FAKE_REFRESH_TOKEN }

export const UNCLASSIFIED = { terminal: false, code: null, description: null }

export const ALLOW: RepollDecision = { kind: "allow" }

export const INITIAL = INITIAL_REPOLL_GATE_STATE

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
