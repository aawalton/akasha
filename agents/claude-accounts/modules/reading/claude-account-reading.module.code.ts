import { everyOfType, listedAt, typeSlugOf } from "@akasha/indexes"
import type { Reading } from "@akasha/indexes/shape"
import { partedIn, secretAt } from "@akasha/pages-system/page-file-name"
import { uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { z } from "zod"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const ACCESS_TOKEN = "access-token"

const REFRESH_TOKEN = "refresh-token"

const RESCUED = "rescuedCredential"

const RESCUED_ACCESS = "accessToken"

const RESCUED_REFRESH = "refreshToken"

const RESCUED_EXPIRES = "expiresAtMs"

const RESCUED_EXPIRES_KEBAB = "expires-at-ms"

const ACCOUNT_UUID = "accountUuid"

const ALIAS_INDEX = "aliasIndex"

const SUBSCRIPTION_TYPE = "subscriptionType"

const RATE_LIMIT_TIER = "rateLimitTier"

const SCOPES = "scopes"

const ACCESS_TOKEN_EXPIRES_AT = "accessTokenExpiresAt"

const FIVE_HOUR_PERCENT_USED = "fiveHourPercentUsed"

const SEVEN_DAY_PERCENT_USED = "sevenDayPercentUsed"

const FIVE_HOUR_RESETS_AT = "fiveHourResetsAt"

const SEVEN_DAY_RESETS_AT = "sevenDayResetsAt"

const LAST_WINDOW_TRIGGER_AT = "lastWindowTriggerAt"

const RETRY_ALLOWED_AT = "retryAllowedAt"

const SUBSCRIPTION_DISABLED_REASON = "subscriptionDisabledReason"

const TERMINAL_AT = "terminalAt"

const TERMINAL_ALERTED_AT = "terminalAlertedAt"

const NOTHING_SPENT = 0

const HELD_SHAPE = z.looseObject({})

const RESCUED_SHAPE = z.looseObject({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAtMs: z.number(),
})

export type AccountState = {
  readonly slug: string
  readonly fiveHourPercentUsed: number
  readonly sevenDayPercentUsed: number
  readonly fiveHourResetsAt: string | null
  readonly sevenDayResetsAt: string | null
  readonly subscriptionType: string | null
  readonly subscriptionDisabledReason: string | null
  readonly retryAllowedAtMs: number | null
  readonly terminalAtMs: number | null
  readonly terminalAlertedAtMs: number | null
  readonly lastWindowTriggerAtMs: number | null
  readonly accessTokenExpiresAtMs: number | null
}

export type RescuedCredential = {
  readonly accessToken: string
  readonly refreshToken: string
  readonly accessTokenExpiresAtMs: number
}

export type AccountCredential = {
  readonly slug: string
  readonly accessToken: string
  readonly refreshToken: string
  readonly accessTokenExpiresAtMs: number
  readonly scopes: readonly string[]
  readonly subscriptionType: string | null
  readonly rateLimitTier: string | null
  readonly subscriptionDisabledReason: string | null
  readonly terminalAlertedAtMs: number | null
}

export type CredentialRead =
  | { readonly kind: "read"; readonly credential: AccountCredential }
  | { readonly kind: "absent"; readonly why: string }

export type SecretsRead = (root: string, page: string) => ReadonlyMap<string, string> | null

export type ListedAccount = {
  readonly slug: string
  readonly path: string
}

function textIn(held: Value | null, key: string): string | null {
  const said = held?.[key]
  return typeof said === "string" && said !== "" ? said : null
}

function isoIn(held: Value | null, key: string): string | null {
  const said = textIn(held, key)
  if (said === null) return null
  return Number.isNaN(Date.parse(said)) ? null : said
}

function msIn(held: Value | null, key: string): number | null {
  const said = isoIn(held, key)
  return said === null ? null : Date.parse(said)
}

function spentIn(held: Value | null, key: string): number {
  const said = held?.[key]
  return typeof said === "number" && Number.isFinite(said) ? said : NOTHING_SPENT
}

function listIn(held: Value | null, key: string): readonly string[] {
  const said = held?.[key]
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function byName(one: string, two: string): number {
  return one < two ? -1 : one > two ? 1 : 0
}

function accountTypeIn(given: string | Reading): string {
  return typeSlugOf(given, ACCOUNT_TYPE)
}

export function accountPathIn(given: string | Reading, slug: string): string | null {
  return listedAt(given, accountTypeIn(given), slug)[0]?.path ?? null
}

export function accountValuesIn(root: string, slug: string): Value | null {
  const page = accountPathIn(root, slug)
  return page === null ? null : valueAt(page, root)
}

export function accountBesideIn(root: string, slug: string): Value | null {
  const page = accountPathIn(root, slug)
  if (page === null) return null
  return uncommittedIn(root, page) ?? {}
}

export function accountSecretPathIn(root: string, slug: string): string | null {
  const page = accountPathIn(root, slug)
  return page === null ? null : secretAt(page)
}

export function stateFrom(slug: string, stated: Value | null, beside: Value | null): AccountState {
  return {
    slug,
    fiveHourPercentUsed: spentIn(beside, FIVE_HOUR_PERCENT_USED),
    sevenDayPercentUsed: spentIn(beside, SEVEN_DAY_PERCENT_USED),
    fiveHourResetsAt: isoIn(beside, FIVE_HOUR_RESETS_AT),
    sevenDayResetsAt: isoIn(beside, SEVEN_DAY_RESETS_AT),
    subscriptionType: textIn(stated, SUBSCRIPTION_TYPE),
    subscriptionDisabledReason: textIn(beside, SUBSCRIPTION_DISABLED_REASON),
    retryAllowedAtMs: msIn(beside, RETRY_ALLOWED_AT),
    terminalAtMs: msIn(beside, TERMINAL_AT),
    terminalAlertedAtMs: msIn(beside, TERMINAL_ALERTED_AT),
    lastWindowTriggerAtMs: msIn(beside, LAST_WINDOW_TRIGGER_AT),
    accessTokenExpiresAtMs: msIn(beside, ACCESS_TOKEN_EXPIRES_AT),
  }
}

export function accountStateIn(root: string, slug: string): AccountState | null {
  const page = accountPathIn(root, slug)
  if (page === null) return null
  const stated = valueAt(page, root)
  if (stated === null) return null
  return stateFrom(slug, stated, uncommittedIn(root, page))
}

function spelledInAkasha(held: unknown): unknown {
  const said = HELD_SHAPE.safeParse(held)
  if (!said.success) return held
  const at = said.data
  return {
    ...at,
    [RESCUED_ACCESS]: at[RESCUED_ACCESS] ?? at[ACCESS_TOKEN],
    [RESCUED_REFRESH]: at[RESCUED_REFRESH] ?? at[REFRESH_TOKEN],
    [RESCUED_EXPIRES]: at[RESCUED_EXPIRES] ?? at[RESCUED_EXPIRES_KEBAB],
  }
}

export function rescuedIn(beside: Value | null): RescuedCredential | null {
  if (beside === null) return null
  const said = RESCUED_SHAPE.safeParse(spelledInAkasha(beside[RESCUED]))
  if (!said.success) return null
  return {
    accessToken: said.data.accessToken,
    refreshToken: said.data.refreshToken,
    accessTokenExpiresAtMs: said.data.expiresAtMs,
  }
}

export function credentialFrom(
  slug: string,
  stated: Value | null,
  beside: Value | null,
  secrets: ReadonlyMap<string, string> | null
): CredentialRead {
  if (stated === null) return { kind: "absent", why: `no page is filed for \`${slug}\`` }
  if (secrets === null) {
    return { kind: "absent", why: `\`${slug}\` names no sops file beside its page` }
  }
  const accessToken = secrets.get(ACCESS_TOKEN)
  const refreshToken = secrets.get(REFRESH_TOKEN)
  if (accessToken === undefined || refreshToken === undefined) {
    return {
      kind: "absent",
      why: `the sops file beside \`${slug}\` holds no \`${ACCESS_TOKEN}\` or no \`${REFRESH_TOKEN}\``,
    }
  }
  const expiresAtMs = msIn(beside, ACCESS_TOKEN_EXPIRES_AT)
  if (expiresAtMs === null) {
    return {
      kind: "absent",
      why: `nothing beside \`${slug}\` reads as an \`${ACCESS_TOKEN_EXPIRES_AT}\`, and a credential without one cannot be judged expired`,
    }
  }
  const rescued = rescuedIn(beside)
  const taken =
    rescued !== null && rescued.accessTokenExpiresAtMs > expiresAtMs
      ? rescued
      : { accessToken, refreshToken, accessTokenExpiresAtMs: expiresAtMs }
  return {
    kind: "read",
    credential: {
      slug,
      accessToken: taken.accessToken,
      refreshToken: taken.refreshToken,
      accessTokenExpiresAtMs: taken.accessTokenExpiresAtMs,
      scopes: listIn(stated, SCOPES),
      subscriptionType: textIn(stated, SUBSCRIPTION_TYPE),
      rateLimitTier: textIn(stated, RATE_LIMIT_TIER),
      subscriptionDisabledReason: textIn(beside, SUBSCRIPTION_DISABLED_REASON),
      terminalAlertedAtMs: msIn(beside, TERMINAL_ALERTED_AT),
    },
  }
}

function credentialAt(
  root: string,
  slug: string,
  page: string,
  secretsRead: SecretsRead
): CredentialRead {
  try {
    let secrets: ReadonlyMap<string, string> | null
    try {
      secrets = secretsRead(root, page)
    } catch (thrown) {
      return { kind: "absent", why: sayOf(thrown) }
    }
    return credentialFrom(slug, valueAt(page, root), uncommittedIn(root, page), secrets)
  } catch (thrown) {
    return { kind: "absent", why: `\`${slug}\` could not be read off its page: ${sayOf(thrown)}` }
  }
}

export function credentialIn(root: string, slug: string, secretsRead: SecretsRead): CredentialRead {
  const page = accountPathIn(root, slug)
  if (page === null) return { kind: "absent", why: `no page is filed for \`${slug}\`` }
  return credentialAt(root, slug, page, secretsRead)
}

export function everyAccountIn(given: string | Reading): readonly ListedAccount[] {
  const found = new Map<string, string>()
  for (const one of everyOfType(given, accountTypeIn(given))) {
    const said = partedIn(one.path)
    if (said === null) continue
    if (!found.has(said.slug)) found.set(said.slug, one.path)
  }
  return [...found]
    .map(([slug, path]) => ({ slug, path }))
    .sort((one, two) => byName(one.slug, two.slug))
}

export function everyAccountSlugIn(given: string | Reading): readonly string[] {
  return everyAccountIn(given).map((one) => one.slug)
}

export function everyAccountStateIn(root: string): ReadonlyMap<string, AccountState> {
  const found = new Map<string, AccountState>()
  for (const one of everyAccountIn(root)) {
    const stated = valueAt(one.path, root)
    if (stated === null) continue
    found.set(one.slug, stateFrom(one.slug, stated, uncommittedIn(root, one.path)))
  }
  return found
}

export function everyCredentialIn(
  root: string,
  secretsRead: SecretsRead
): ReadonlyMap<string, CredentialRead> {
  const found = new Map<string, CredentialRead>()
  for (const one of everyAccountIn(root)) {
    found.set(one.slug, credentialAt(root, one.slug, one.path, secretsRead))
  }
  return found
}

export function accountUuidsIn(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of everyAccountIn(root)) {
    const uuid = textIn(valueAt(one.path, root), ACCOUNT_UUID)
    if (uuid !== null) found.set(one.slug, uuid)
  }
  return found
}

export function aliasIndexesIn(root: string): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of everyAccountIn(root)) {
    const said = valueAt(one.path, root)?.[ALIAS_INDEX]
    const index = typeof said === "number" ? said : Number(said)
    if (Number.isInteger(index)) found.set(one.slug, index)
  }
  return found
}

export function lastWindowTriggerAcross(states: Iterable<AccountState>): number | null {
  let latest: number | null = null
  for (const one of states) {
    const at = one.lastWindowTriggerAtMs
    if (at !== null && (latest === null || at > latest)) latest = at
  }
  return latest
}
