import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { removeUncommitted } from "@akasha/pages-system/page-uncommitted"
import {
  DOORS as PUSH_DOORS,
  type Doors as PushDoors,
  pushedIn,
} from "../credential-push/claude-account-credential-push.module.code.ts"
import { type Marks, markedIn } from "../marking/claude-account-marking.module.code.ts"
import { PROFILE_RESPONSE_SCHEMA, PROFILE_URL } from "../oauth/claude-account-oauth.module.code.ts"
import { accountPathIn, accountValuesIn } from "../reading/claude-account-reading.module.code.ts"

const PROBE_TIMEOUT_MS = 750

const BODY_SUMMARY_AT_MOST = 200

const ELLIPSIS = "…"

const WHITESPACE = /\s+/g

const ONE_SPACE = " "

const CONTENT_TYPE = "content-type"

const CONTENT_TYPE_UNKNOWN = "unknown"

const PROBE_AGENT = "claude-code/2.1.63"

const OAUTH_BETA = "oauth-2025-04-20"

const ACCOUNT_UUID = "accountUuid"

const RETRY_ALLOWED_AT = "retryAllowedAt"

const TERMINAL_AT = "terminalAt"

const TERMINAL_ALERTED_AT = "terminalAlertedAt"

const SUBSCRIPTION_DISABLED_REASON = "subscriptionDisabledReason"

const LAST_WINDOW_TRIGGER_AT = "lastWindowTriggerAt"

export type CredentialIdentity = {
  readonly accountUuid: string
  readonly email: string | null
}

export type IdentityPush =
  | { readonly kind: "match" }
  | { readonly kind: "pin"; readonly accountUuid: string }
  | { readonly kind: "rebind"; readonly accountUuid: string; readonly previousUuid: string }
  | { readonly kind: "refuse"; readonly reason: string }

export type PinStage = "clear" | "credential" | "pin"

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function summarized(body: string): string {
  const collapsed = body.replace(WHITESPACE, ONE_SPACE).trim()
  return collapsed.length > BODY_SUMMARY_AT_MOST
    ? `${collapsed.slice(0, BODY_SUMMARY_AT_MOST)}${ELLIPSIS}`
    : collapsed
}

export function sayFailedPin(args: {
  readonly slug: string
  readonly previousUuid: string | null
  readonly at: PinStage
  readonly why: string
}): string {
  const what =
    args.previousUuid === null
      ? `pinning claude-account "${args.slug}" to the upstream account its credential resolves to`
      : `re-pinning claude-account "${args.slug}" off upstream account ${args.previousUuid}`
  if (args.at === "clear") {
    return (
      `${what} stopped before anything moved: ${args.why}. The page keeps the credential and the ` +
      `bookkeeping it already held, so nothing is half done.`
    )
  }
  if (args.at === "credential") {
    const alreadyCleared =
      args.previousUuid === null
        ? ""
        : ` The previous account's pacing and at-limit bookkeeping is already off the page, and clearing it again costs nothing.`
    return (
      `${what}: the credential did not reach the page — ${args.why}. The credential still stands where it ` +
      `was issued and the page is pinned where it was, so the same push run again lands all of it.${alreadyCleared}`
    )
  }
  const naming =
    args.previousUuid === null
      ? "naming no upstream account"
      : `still naming upstream account ${args.previousUuid}`
  return (
    `${what}: the credential reached the page but the pin did not — ${args.why}. The page holds the new ` +
    `credential while ${naming}, so repair what the page refused and push again to finish the pin.`
  )
}

export function decideIdentityPush(args: {
  readonly slug: string
  readonly identity: CredentialIdentity
  readonly pinnedUuidBySlug: ReadonlyMap<string, string>
  readonly allowRebind: boolean
}): IdentityPush {
  const { slug, identity, pinnedUuidBySlug, allowRebind } = args
  const observed = identity.accountUuid
  const who = identity.email ?? "login email unknown"

  for (const [otherSlug, otherUuid] of pinnedUuidBySlug) {
    if (otherSlug === slug || otherUuid !== observed) continue
    return {
      kind: "refuse",
      reason:
        `the credential offered for claude-account "${slug}" belongs to upstream account ` +
        `${observed} (${who}), which claude-account "${otherSlug}" is already pinned to. Two ` +
        `claude-accounts must never map to one upstream account — that is the phantom-account ` +
        `defect: the picker counts capacity twice and rotating off one lands on the same wall. ` +
        `Re-auth "${slug}" with a browser session signed in as its own account.`,
    }
  }

  const pinned = pinnedUuidBySlug.get(slug)
  if (pinned === undefined) return { kind: "pin", accountUuid: observed }
  if (pinned === observed) return { kind: "match" }
  if (!allowRebind) {
    return {
      kind: "refuse",
      reason:
        `identity mismatch on claude-account "${slug}": its page is pinned to upstream account ` +
        `${pinned}, but the credential offered resolves to ${observed} (${who}). Refusing the ` +
        `write — a credential is never written to a page it does not belong to. If this ` +
        `swap is intentional, re-run with --rebind, which re-pins the page and clears the previous ` +
        `account's pacing and at-limit bookkeeping as part of the same push.`,
    }
  }
  return { kind: "rebind", accountUuid: observed, previousUuid: pinned }
}

export async function identityProbed(accessToken: string): Promise<CredentialIdentity> {
  const answered = await fetch(PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": PROBE_AGENT,
      "anthropic-beta": OAUTH_BETA,
    },
    signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
  })

  if (!answered.ok) {
    throw new Error(
      `identity probe failed: ${answered.status} (content-type ` +
        `${answered.headers.get(CONTENT_TYPE) ?? CONTENT_TYPE_UNKNOWN}) ${summarized(await answered.text())}`
    )
  }

  const parsed = PROFILE_RESPONSE_SCHEMA.safeParse(await answered.json())
  if (!parsed.success) {
    throw new Error(`identity probe response malformed: ${parsed.error.message}`)
  }
  return { accountUuid: parsed.data.account.uuid, email: parsed.data.account.email ?? null }
}

export const IDENTITY_SCOPED_KEYS: readonly string[] = [
  RETRY_ALLOWED_AT,
  TERMINAL_AT,
  TERMINAL_ALERTED_AT,
  SUBSCRIPTION_DISABLED_REASON,
  LAST_WINDOW_TRIGGER_AT,
]

export function identityClearMarks(): Marks {
  return Object.fromEntries(IDENTITY_SCOPED_KEYS.map((key) => [key, null]))
}

export type Pinned =
  | {
      readonly kind: "pinned"
      readonly slug: string
      readonly accountUuid: string
      readonly credential: "pushed" | "unchanged" | "stale"
    }
  | { readonly kind: "refused"; readonly slug: string; readonly at: PinStage; readonly why: string }

export type Doors = {
  readonly push: PushDoors
}

export const DOORS: Doors = { push: PUSH_DOORS }

export function pinnedIn(
  root: string,
  given: {
    readonly slug: string
    readonly accountUuid: string
    readonly accessToken: string
    readonly refreshToken: string
    readonly accessTokenExpiresAtMs: number
    readonly previousUuid: string | null
  },
  doors: Doors,
  reading: Reading,
  pageOf: PageOf
): Pinned {
  const { slug } = given
  let at: PinStage = "clear"
  const refused = (why: string): Pinned => ({ kind: "refused", slug, at, why })
  try {
    const page = accountPathIn(reading, slug)
    if (page === null) {
      return refused(`no page stands for \`${slug}\`, and a pin belongs to a page`)
    }

    if (given.previousUuid !== null) {
      const dropped = markedIn(root, slug, identityClearMarks(), reading, pageOf)
      if (dropped.kind !== "held") {
        return refused(dropped.kind === "unchanged" ? dropped.kind : dropped.why)
      }
      try {
        removeUncommitted(root, page)
      } catch (thrown) {
        return refused(`the volatile numbers beside ${page} could not be dropped: ${sayOf(thrown)}`)
      }
    }

    at = "credential"
    const pushed = pushedIn(
      root,
      {
        slug,
        accessToken: given.accessToken,
        refreshToken: given.refreshToken,
        accessTokenExpiresAtMs: given.accessTokenExpiresAtMs,
      },
      doors.push,
      reading,
      pageOf
    )
    if (pushed.kind === "refused" || pushed.kind === "absent") return refused(pushed.why)

    at = "pin"
    // The uuid is what the account IS, settled when the account is made. A sign-in answering the
    // same one has nothing to pin. One answering a different one has reached a different Anthropic
    // account under this name, and which account this is is a person's to say rather than a
    // reading to overwrite.
    const stated = accountValuesIn(root, slug)?.[ACCOUNT_UUID]
    if (stated !== given.accountUuid) {
      return refused(
        `${page} states \`${String(stated)}\` and this sign-in answered \`${given.accountUuid}\`, so it reached ` +
          `another Anthropic account under this name — say which account \`${slug}\` is on its page`
      )
    }

    return { kind: "pinned", slug, accountUuid: given.accountUuid, credential: pushed.kind }
  } catch (thrown) {
    return refused(`the identity pin threw, which it is written never to do: ${sayOf(thrown)}`)
  }
}
