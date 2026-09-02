import { readingIn } from "@akasha/indexes"
import { secretsIn } from "@akasha/pages-system/page-secret"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  atLimitMarks,
  type Given,
  markedIn,
  pacingMarks,
  subscriptionMarks,
  usageFrom,
} from "../../../../claude-accounts/modules/marking/claude-account-marking.module.code.ts"
import {
  decideUsageRepoll,
  INITIAL_REPOLL_GATE_STATE,
  REFRESH_BUFFER_MS,
  type RepollGateState,
  recordRepollAttempt,
  recordUsageRateLimited,
  USAGE_URL,
} from "../../../../claude-accounts/modules/oauth/claude-account-oauth.module.code.ts"
import { hoursUntilReset } from "../../../../claude-accounts/modules/pacing/claude-account-pacing.module.code.ts"
import {
  type AccountCredential,
  type AccountState as AccountReading,
  credentialIn,
  everyAccountStateIn,
  everyCredentialIn,
  type SecretsRead,
} from "../../../../claude-accounts/modules/reading/claude-account-reading.module.code.ts"
import {
  parseFutureIsoMs,
  selectBestAccount,
} from "../../../../claude-accounts/modules/selection/claude-account-selection.module.code.ts"
import type {
  AccountState,
  CredentialPick,
  OAuthCredential,
} from "../oauth-types/oauth-types.module.code.ts"

const RATE_LIMITED = 429

const USAGE_TIMEOUT_MS = 10_000

const USER_AGENT = "claude-code/2.1.63"

const ANTHROPIC_BETA = "oauth-2025-04-20"

const NO_EXCLUDES: ReadonlySet<string> = new Set()

const DEFAULT_LOG_PREFIX = "[oauth]"

export type UsageRead =
  | { readonly kind: "read"; readonly body: unknown }
  | { readonly kind: "refused"; readonly status: number }
  | { readonly kind: "threw"; readonly error: unknown }

export type UsageFetch = (accessToken: string) => Promise<UsageRead>

export type GetToken = (account: string) => Promise<OAuthCredential | null>

export type Candidate = {
  readonly account: string
  readonly subscriptionType: string | null
  readonly credential: OAuthCredential
}

export type OAuthEffects = {
  readonly getBestCredential: (
    logPrefix?: string,
    excludeAccounts?: ReadonlySet<string>
  ) => Promise<CredentialPick | null>
  readonly getCredentialByAccount: (
    account: string,
    logPrefix?: string
  ) => Promise<OAuthCredential | null>
  readonly markAccountAtLimit: (args: {
    account: string
    retryAfterHeader: string | null
    logPrefix?: string
  }) => Promise<void>
  readonly repollUsageAfter429: (
    account: string,
    getToken: GetToken,
    logPrefix?: string
  ) => Promise<void>
  readonly getClaudeAccountPacing: () => Promise<ReadonlyMap<string, AccountState>>
  readonly markAccountSubscriptionDisabled: (
    account: string,
    reason: string,
    logPrefix?: string
  ) => Promise<void>
  readonly clearAccountSubscriptionDisabled: (account: string, logPrefix?: string) => Promise<void>
}

export type Doors = {
  readonly secretsRead: SecretsRead
  readonly usageFetch: UsageFetch
  readonly now: () => number
  readonly said: (line: string) => undefined
  readonly warned: (line: string) => undefined
}

export async function usageFetched(accessToken: string): Promise<UsageRead> {
  try {
    const res = await fetch(USAGE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        "anthropic-beta": ANTHROPIC_BETA,
      },
      signal: AbortSignal.timeout(USAGE_TIMEOUT_MS),
    })
    if (!res.ok) return { kind: "refused", status: res.status }
    return { kind: "read", body: await res.json() }
  } catch (thrown) {
    return { kind: "threw", error: thrown }
  }
}

export const DOORS: Doors = {
  secretsRead: secretsIn,
  usageFetch: usageFetched,
  now: () => Date.now(),
  said: (line) => {
    console.log(line)
  },
  warned: (line) => {
    console.error(line)
  },
}

export function credentialOf(one: AccountCredential): OAuthCredential {
  return {
    account: one.slug,
    accessToken: one.accessToken,
    refreshToken: one.refreshToken,
    expiresAt: one.accessTokenExpiresAtMs,
    scopes: one.scopes,
    subscriptionType: one.subscriptionType,
    rateLimitTier: one.rateLimitTier,
  }
}

export function pacingOf(one: AccountReading): AccountState {
  return {
    account: one.slug,
    fiveHourUtil: one.fiveHourPercentUsed,
    sevenDayUtil: one.sevenDayPercentUsed,
    sevenDayResetsAt: one.sevenDayResetsAt,
    fiveHourResetsAt: one.fiveHourResetsAt,
    subscriptionType: one.subscriptionType,
    subscriptionDisabled: one.subscriptionDisabledReason !== null,
    fiveHourAtLimitUntil: one.retryAllowedAtMs,
    renewalTerminal: one.terminalAtMs !== null,
    accessTokenExpiresAt: one.accessTokenExpiresAtMs,
  }
}

export function pacingIn(root: string): ReadonlyMap<string, AccountState> {
  const found = new Map<string, AccountState>()
  for (const [slug, one] of everyAccountStateIn(root)) found.set(slug, pacingOf(one))
  return found
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function credentialByAccountIn(
  root: string,
  doors: Doors,
  account: string,
  logPrefix: string
): OAuthCredential | null {
  try {
    const held = credentialIn(root, account, doors.secretsRead)
    if (held.kind === "absent") {
      doors.warned(`${logPrefix} ${account} could not be read off its page: ${held.why}`)
      return null
    }
    return credentialOf(held.credential)
  } catch (thrown) {
    doors.warned(`${logPrefix} ${account} could not be read off its page: ${sayOf(thrown)}`)
    return null
  }
}

export function bestCredentialIn(
  root: string,
  doors: Doors,
  logPrefix: string,
  excludeAccounts: ReadonlySet<string>
): CredentialPick | null {
  try {
    const states = pacingIn(root)
    const found: Candidate[] = []
    for (const [slug, held] of everyCredentialIn(root, doors.secretsRead)) {
      if (held.kind === "absent") {
        doors.warned(`${logPrefix} ${slug} could not be read off its page: ${held.why}`)
        continue
      }
      const credential = credentialOf(held.credential)
      found.push({ account: slug, subscriptionType: credential.subscriptionType, credential })
    }
    if (found.length === 0) return null
    const now = doors.now()
    const excludes = new Set(excludeAccounts)
    while (true) {
      const picked = selectBestAccount({
        candidates: found,
        states,
        now,
        hoursUntilReset,
        excludes,
      })
      if (picked === null) return null
      const { credential } = picked.candidate
      const at = new Date(credential.expiresAt).toISOString()
      if (credential.expiresAt <= now) {
        doors.warned(
          `${logPrefix} ${credential.account} expired at ${at} and nothing here renews one — the upkeep has not reached it, trying the next account`
        )
        excludes.add(credential.account)
        continue
      }
      if (credential.expiresAt < now + REFRESH_BUFFER_MS) {
        doors.warned(
          `${logPrefix} ${credential.account} expires at ${at}, inside the reader's buffer — the upkeep is behind`
        )
      }
      return {
        credential,
        fiveHourResetsAtMs: parseFutureIsoMs(picked.state.fiveHourResetsAt, now),
      }
    }
  } catch (thrown) {
    doors.warned(`${logPrefix} no account could be chosen: ${sayOf(thrown)}`)
    return null
  }
}

export function markedOn(
  root: string,
  doors: Doors,
  account: string,
  marks: Given,
  logPrefix: string
): undefined {
  try {
    const outcome = markedIn(root, account, marks, readingIn(root), (path) => valueAt(path, root))
    if (outcome.kind === "refused" || outcome.kind === "absent") {
      doors.warned(`${logPrefix} ${account} kept a mark off its page: ${outcome.why}`)
    }
  } catch (thrown) {
    doors.warned(`${logPrefix} ${account} kept a mark off its page: ${sayOf(thrown)}`)
  }
}

export async function repolledIn(args: {
  readonly root: string
  readonly doors: Doors
  readonly gates: Map<string, RepollGateState>
  readonly account: string
  readonly getToken: GetToken
  readonly logPrefix: string
}): Promise<undefined> {
  const { root, doors, gates, account, getToken, logPrefix } = args
  const now = doors.now()
  const state = gates.get(account) ?? INITIAL_REPOLL_GATE_STATE
  const decision = decideUsageRepoll(state, now)
  if (decision.kind === "skip") {
    doors.said(`${logPrefix} the usage re-poll for ${account} was skipped: ${decision.reason}`)
    return
  }
  gates.set(account, recordRepollAttempt(state, now))
  const credential = await getToken(account)
  if (credential === null) return
  const read = await doors.usageFetch(credential.accessToken)
  if (read.kind === "refused") {
    if (read.status === RATE_LIMITED) {
      gates.set(account, recordUsageRateLimited(state, doors.now()))
      doors.warned(
        `${logPrefix} the usage endpoint rate-limited the re-poll for ${account}; the breaker is open`
      )
      return
    }
    doors.warned(`${logPrefix} the usage re-poll for ${account} was answered ${read.status}`)
    return
  }
  if (read.kind === "threw") {
    doors.warned(`${logPrefix} the usage re-poll for ${account} threw: ${sayOf(read.error)}`)
    return
  }
  const usage = usageFrom(read.body)
  if (usage === null) {
    doors.warned(`${logPrefix} the usage the re-poll read for ${account} is malformed`)
    return
  }
  markedOn(root, doors, account, pacingMarks(doors.now(), usage), logPrefix)
}

export function oauthEffectsIn(root: string, doors: Doors = DOORS): OAuthEffects {
  const gates = new Map<string, RepollGateState>()
  return {
    getBestCredential: async (logPrefix = DEFAULT_LOG_PREFIX, excludeAccounts = NO_EXCLUDES) =>
      bestCredentialIn(root, doors, logPrefix, excludeAccounts),
    getCredentialByAccount: async (account, logPrefix = DEFAULT_LOG_PREFIX) =>
      credentialByAccountIn(root, doors, account, logPrefix),
    markAccountAtLimit: async (given) => {
      markedOn(
        root,
        doors,
        given.account,
        atLimitMarks(doors.now(), given.retryAfterHeader),
        given.logPrefix ?? DEFAULT_LOG_PREFIX
      )
    },
    repollUsageAfter429: async (account, getToken, logPrefix = DEFAULT_LOG_PREFIX) => {
      await repolledIn({ root, doors, gates, account, getToken, logPrefix })
    },
    getClaudeAccountPacing: async () => pacingIn(root),
    markAccountSubscriptionDisabled: async (account, reason, logPrefix = DEFAULT_LOG_PREFIX) => {
      markedOn(root, doors, account, subscriptionMarks(reason), logPrefix)
    },
    clearAccountSubscriptionDisabled: async (account, logPrefix = DEFAULT_LOG_PREFIX) => {
      markedOn(root, doors, account, subscriptionMarks(null), logPrefix)
    },
  }
}
