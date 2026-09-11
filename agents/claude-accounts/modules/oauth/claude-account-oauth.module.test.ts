import { expect, test } from "bun:test"
import {
  backoffExpiryMs,
  classifyOAuthError,
  DEFAULT_AT_LIMIT_BACKOFF_MS,
  decideUsageRepoll,
  MAX_AT_LIMIT_BACKOFF_MS,
  OAUTH_CLIENT_ID,
  OAUTH_TOKEN_RESPONSE_SCHEMA,
  OAUTH_TOKEN_URL,
  PROFILE_RESPONSE_SCHEMA,
  PROFILE_URL,
  REFRESH_BUFFER_MS,
  REPOLL_BREAKER_MS,
  REPOLL_MIN_INTERVAL_MS,
  type RefreshOutcome,
  recordRepollAttempt,
  recordUsageRateLimited,
  UPKEEP_PERIOD_MS,
  UPKEEP_RENEWAL_MARGIN_MS,
  USAGE_RESPONSE_SCHEMA,
  USAGE_URL,
} from "akasha/agents/claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"
import {
  ALLOW,
  AT_EPOCH,
  BARE,
  backoffAt,
  breakerSkip,
  FAILED,
  FAKE_ACCESS_TOKEN,
  FAKE_ACCOUNT_UUID,
  FAKE_ORG_UUID,
  INITIAL,
  intervalSkip,
  NO_CREDENTIAL_ON_A_FAILING_OUTCOME,
  NO_TERMINAL_ON_A_WORKING_OUTCOME,
  NOW,
  PROFILE_EXTRA_KEYS,
  PROFILE_REALISTIC,
  PROFILE_WITH_PROTO,
  RECENT_ATTEMPT,
  RETRYABLE,
  STALE_ATTEMPT,
  STATUS_IS_OPTIONAL,
  TOKEN_BODY,
  TOKEN_OK,
  TOKEN_WITH_EXTRA_KEYS,
  UNCLASSIFIED,
  USAGE_EXTRA_KEYS,
  USAGE_NO_RESET_KEY,
  USAGE_NULL_RESETS,
  USAGE_ONE_WINDOW,
  USAGE_REALISTIC,
  WORKED,
} from "akasha/agents/claude-accounts/modules/oauth/claude-account-oauth.module.test-fixtures.ts"

test("the wire endpoints are the constants this module names", () => {
  expect(OAUTH_TOKEN_URL).toBe("https://platform.claude.com/v1/oauth/token")
  expect(USAGE_URL).toBe("https://api.anthropic.com/api/oauth/usage")
  expect(PROFILE_URL).toBe("https://api.anthropic.com/api/oauth/profile")
  expect(OAUTH_CLIENT_ID).toBe("9d1c250a-e61b-44d9-88ed-5944d1962f5e")
  expect(REFRESH_BUFFER_MS).toBe(300_000)
})

test("a realistic token response parses", () => {
  const parsed = OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse(TOKEN_OK)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.access_token).toBe(FAKE_ACCESS_TOKEN)
  expect(parsed.data?.expires_in).toBe(28_800)
})

test("a token response carrying keys the shape does not name keeps them", () => {
  const parsed = OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse(TOKEN_WITH_EXTRA_KEYS)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.token_type).toBe("Bearer")
  expect(parsed.data?.scope).toBe("user:inference user:profile")
})

test("a token response naming an empty token is refused", () => {
  expect(
    OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse({ ...TOKEN_BODY, access_token: "", expires_in: 1 })
      .success
  ).toBe(false)
})

test("a token response missing a required field is refused", () => {
  for (const missing of ["access_token", "refresh_token", "expires_in"]) {
    const payload: Record<string, unknown> = { ...TOKEN_OK }
    delete payload[missing]
    expect(OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse(payload).success).toBe(false)
  }
})

test("a token response naming an unusable number is refused", () => {
  for (const expires of [Number.NaN, Number.POSITIVE_INFINITY, "28800"]) {
    expect(
      OAUTH_TOKEN_RESPONSE_SCHEMA.safeParse({ ...TOKEN_BODY, expires_in: expires }).success
    ).toBe(false)
  }
})

test("a realistic usage response parses", () => {
  const parsed = USAGE_RESPONSE_SCHEMA.safeParse(USAGE_REALISTIC)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.five_hour.utilization).toBe(12.5)
  expect(parsed.data?.seven_day.resets_at).toBe("2026-09-06T00:00:00Z")
})

test("a usage window naming a null reset parses", () => {
  const parsed = USAGE_RESPONSE_SCHEMA.safeParse(USAGE_NULL_RESETS)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.five_hour.resets_at).toBeNull()
})

test("a usage response carrying keys the shape does not name keeps them", () => {
  const parsed = USAGE_RESPONSE_SCHEMA.safeParse(USAGE_EXTRA_KEYS)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.five_hour.remaining).toBe(4)
  expect(parsed.data?.seven_day_opus).toEqual({ utilization: 1, resets_at: null })
})

test("a usage window missing its reset key is refused", () => {
  expect(USAGE_RESPONSE_SCHEMA.safeParse(USAGE_NO_RESET_KEY).success).toBe(false)
})

test("a usage response missing a window is refused", () => {
  expect(USAGE_RESPONSE_SCHEMA.safeParse(USAGE_ONE_WINDOW).success).toBe(false)
})

test("a realistic profile response parses", () => {
  const parsed = PROFILE_RESPONSE_SCHEMA.safeParse(PROFILE_REALISTIC)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.account.uuid).toBe(FAKE_ACCOUNT_UUID)
  expect(parsed.data?.account.email).toBe("fleet-07@example.invalid")
})

test("a profile response missing its optional email parses", () => {
  const parsed = PROFILE_RESPONSE_SCHEMA.safeParse({ account: { uuid: FAKE_ACCOUNT_UUID } })
  expect(parsed.success).toBe(true)
  expect(parsed.data?.account.email).toBeUndefined()
  expect(Object.hasOwn(parsed.data?.account ?? {}, "email")).toBe(false)
})

test("a profile response carrying keys the shape does not name keeps them", () => {
  const parsed = PROFILE_RESPONSE_SCHEMA.safeParse(PROFILE_EXTRA_KEYS)
  expect(parsed.success).toBe(true)
  expect(parsed.data?.account.has_claude_max).toBe(true)
  expect(parsed.data?.organization).toEqual({ uuid: FAKE_ORG_UUID, name: "Fleet" })
})

test("a profile response naming an empty account uuid is refused", () => {
  expect(PROFILE_RESPONSE_SCHEMA.safeParse({ account: { uuid: "" } }).success).toBe(false)
  expect(PROFILE_RESPONSE_SCHEMA.safeParse({}).success).toBe(false)
})

test("a `__proto__` key in a parsed body reaches no prototype", () => {
  const parsed = PROFILE_RESPONSE_SCHEMA.safeParse(PROFILE_WITH_PROTO)
  expect(parsed.success).toBe(true)
  expect(Object.hasOwn({}, "polluted")).toBe(false)
})

test("a status of 500 or above is classified as not terminal", () => {
  for (const status of [500, 502, 503, 529]) {
    expect(classifyOAuthError(status, '{"error":"invalid_grant"}')).toEqual(UNCLASSIFIED)
  }
})

test("a status of 429 is classified with the code `rate_limited`", () => {
  expect(classifyOAuthError(429, '{"error":"invalid_grant"}')).toEqual({
    terminal: false,
    code: "rate_limited",
    description: null,
  })
})

test("the code `invalid_grant` on a 400 is terminal", () => {
  expect(
    classifyOAuthError(400, '{"error":"invalid_grant","error_description":"expired"}')
  ).toEqual({ terminal: true, code: "invalid_grant", description: "expired" })
})

test("the code `invalid_client` on a 401 is terminal", () => {
  expect(classifyOAuthError(401, '{"error":"invalid_client"}')).toEqual({
    terminal: true,
    code: "invalid_client",
    description: null,
  })
})

test("a code the terminal set does not name is not terminal", () => {
  expect(classifyOAuthError(400, '{"error":"temporarily_unavailable"}')).toEqual({
    terminal: false,
    code: "temporarily_unavailable",
    description: null,
  })
})

test("a terminal code below 400 is not terminal", () => {
  expect(classifyOAuthError(200, '{"error":"invalid_grant"}')).toEqual({
    terminal: false,
    code: "invalid_grant",
    description: null,
  })
})

test("an error envelope carrying keys the shape does not name still classifies", () => {
  expect(
    classifyOAuthError(
      400,
      '{"error":"invalid_grant","error_description":"gone","error_uri":"https://example.invalid/e","state":"abc"}'
    )
  ).toEqual({ terminal: true, code: "invalid_grant", description: "gone" })
})

test("an envelope missing its optional fields classifies with no code", () => {
  expect(classifyOAuthError(400, "{}")).toEqual(UNCLASSIFIED)
  expect(classifyOAuthError(400, '{"error":"invalid_grant"}').description).toBeNull()
})

test("a body the JSON parser refuses is classified as not terminal", () => {
  for (const bad of ["", "{", "not json", "[[["]) {
    expect(classifyOAuthError(400, bad)).toEqual(UNCLASSIFIED)
  }
})

test("a body carrying no OAuth error envelope is classified as not terminal", () => {
  for (const bad of ["null", "42", '"s"', '{"error":7}']) {
    expect(classifyOAuthError(400, bad)).toEqual(UNCLASSIFIED)
  }
})

test("a `Retry-After` of whole seconds sets the backoff in milliseconds", () => {
  expect(backoffAt("30")).toBe(NOW + 30_000)
})

test("a backoff read from `Retry-After` is capped at five hours", () => {
  expect(MAX_AT_LIMIT_BACKOFF_MS).toBe(18_000_000)
  expect(backoffAt("999999")).toBe(NOW + MAX_AT_LIMIT_BACKOFF_MS)
  expect(backoffAt("18000")).toBe(NOW + MAX_AT_LIMIT_BACKOFF_MS)
  expect(backoffAt("17999")).toBe(NOW + 17_999_000)
})

test("a missing `Retry-After` backs off five seconds", () => {
  expect(DEFAULT_AT_LIMIT_BACKOFF_MS).toBe(5_000)
  expect(backoffExpiryMs({ now: NOW, retryAfterHeader: null })).toBe(NOW + 5_000)
})

test("a `Retry-After` the number parser refuses backs off the default", () => {
  for (const header of ["", "   ", "0", "-5", "soon", "Wed, 21 Oct 2026 07:28:00 GMT"]) {
    expect(backoffAt(header)).toBe(NOW + 5_000)
  }
})

test("a caller may hand in a backoff other than the default", () => {
  expect(backoffAt(null, 90_000)).toBe(NOW + 90_000)
  expect(backoffAt("30", 90_000)).toBe(NOW + 30_000)
})

test("a gate with no attempt recorded allows a re-poll", () => {
  expect(INITIAL).toEqual({ lastAttemptMs: null, breakerUntilMs: null })
  expect(decideUsageRepoll(INITIAL, NOW)).toEqual(ALLOW)
})

test("a recorded attempt moves the last attempt to the moment handed in", () => {
  expect(recordRepollAttempt(INITIAL, NOW)).toEqual({ lastAttemptMs: NOW, breakerUntilMs: null })
  expect(INITIAL.lastAttemptMs).toBeNull()
})

test("a re-poll inside the minimum interval is skipped", () => {
  const after = recordRepollAttempt(INITIAL, NOW)
  expect(decideUsageRepoll(after, NOW + 1_000)).toEqual(intervalSkip(59))
  expect(decideUsageRepoll(after, NOW + REPOLL_MIN_INTERVAL_MS - 1)).toEqual(intervalSkip(1))
})

test("a re-poll at the minimum interval is allowed", () => {
  const after = recordRepollAttempt(INITIAL, NOW)
  expect(REPOLL_MIN_INTERVAL_MS).toBe(60_000)
  expect(decideUsageRepoll(after, NOW + REPOLL_MIN_INTERVAL_MS)).toEqual(ALLOW)
  expect(decideUsageRepoll(after, NOW + REPOLL_MIN_INTERVAL_MS + 1)).toEqual(ALLOW)
})

test("a recorded rate limit opens the breaker for five minutes", () => {
  expect(REPOLL_BREAKER_MS).toBe(300_000)
  expect(recordUsageRateLimited(INITIAL, NOW)).toEqual({
    lastAttemptMs: NOW,
    breakerUntilMs: NOW + REPOLL_BREAKER_MS,
  })
})

test("an open breaker skips a re-poll", () => {
  const after = recordUsageRateLimited(INITIAL, NOW)
  expect(decideUsageRepoll(after, NOW + 1_000)).toEqual(breakerSkip(299))
})

test("a breaker skip is decided before the minimum interval is read", () => {
  expect(decideUsageRepoll(STALE_ATTEMPT, NOW)).toEqual(breakerSkip(300))
})

test("a breaker whose instant has arrived skips nothing", () => {
  const after = recordUsageRateLimited(INITIAL, NOW)
  expect(decideUsageRepoll(after, NOW + REPOLL_BREAKER_MS)).toEqual(ALLOW)
})

test("a closed breaker inside the minimum interval falls to the interval skip", () => {
  expect(decideUsageRepoll(RECENT_ATTEMPT, NOW)).toEqual(intervalSkip(30))
})

test("a recorded attempt leaves an open breaker open", () => {
  const rateLimited = recordUsageRateLimited(INITIAL, NOW)
  const retried = recordRepollAttempt(rateLimited, NOW + 10_000)
  expect(retried.breakerUntilMs).toBe(NOW + REPOLL_BREAKER_MS)
  expect(retried.lastAttemptMs).toBe(NOW + 10_000)
  expect(decideUsageRepoll(retried, NOW + 10_000)).toEqual(breakerSkip(290))
})

test("a second rate limit pushes the breaker instant out", () => {
  const second = recordUsageRateLimited(recordUsageRateLimited(INITIAL, NOW), NOW + 400_000)
  expect(second.breakerUntilMs).toBe(NOW + 400_000 + REPOLL_BREAKER_MS)
  expect(second.lastAttemptMs).toBe(NOW + 400_000)
})

test("nothing here reads a clock", () => {
  expect(decideUsageRepoll(AT_EPOCH, 10_000)).toEqual(decideUsageRepoll(AT_EPOCH, 10_000))
  expect(backoffExpiryMs({ now: 0, retryAfterHeader: null })).toBe(5_000)
})

test("the upkeep spans are the constants this module names", () => {
  expect(UPKEEP_PERIOD_MS).toBe(3_600_000)
  expect(UPKEEP_RENEWAL_MARGIN_MS).toBe(10_800_000)
  expect(UPKEEP_RENEWAL_MARGIN_MS).toBe(3 * UPKEEP_PERIOD_MS)
  expect(UPKEEP_RENEWAL_MARGIN_MS).toBeGreaterThan(REFRESH_BUFFER_MS)
})

test("a refresh outcome that worked carries the credential the refresh answered with", () => {
  expect(WORKED.ok).toBe(true)
  expect(WORKED.ok ? WORKED.credential.accessToken : null).toBe(FAKE_ACCESS_TOKEN)
  expect(WORKED.ok ? WORKED.credential.expiresAt : null).toBe(NOW + 28_800_000)
})

test("a refresh outcome that failed says whether the failure is terminal", () => {
  expect(FAILED.ok).toBe(false)
  expect(FAILED.ok ? null : FAILED.terminal).toBe(true)
  expect(RETRYABLE.ok ? null : RETRYABLE.terminal).toBe(false)
})

test("a refresh outcome that failed names the sort of failure", () => {
  const reasons: string[] = []
  for (const reason of ["no-credential", "http-error", "exception"] as const) {
    const said: RefreshOutcome = { ok: false, terminal: false, reason }
    reasons.push(said.ok ? "" : said.reason)
  }
  expect(reasons).toEqual(["no-credential", "http-error", "exception"])
})

test("a refresh outcome that failed may carry the status the refresh met", () => {
  expect(FAILED.ok ? null : FAILED.status).toBe(400)
  expect(FAILED.ok ? null : FAILED.code).toBe("invalid_grant")
  expect(BARE.ok ? null : BARE.status).toBeUndefined()
  expect(BARE.ok ? null : BARE.code).toBeUndefined()
  expect(BARE.ok ? null : BARE.description).toBeUndefined()
})

test("a refresh outcome that failed may carry what was thrown", () => {
  const thrown = new Error("socket closed")
  const said: RefreshOutcome = { ok: false, terminal: false, reason: "exception", error: thrown }
  expect(said.ok ? null : said.error).toBe(thrown)
})

test("an outcome that worked names no terminal flag and one that failed names no credential", () => {
  expect(NO_TERMINAL_ON_A_WORKING_OUTCOME).toBe(true)
  expect(NO_CREDENTIAL_ON_A_FAILING_OUTCOME).toBe(true)
  expect(STATUS_IS_OPTIONAL).toBe(true)
})
