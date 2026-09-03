import { readingIn } from "@akasha/indexes"
import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { secretsIn } from "@akasha/pages-system/page-secret"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  markedOn,
  type UsageRead,
  usageFetched,
} from "../../../models/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import {
  DOORS as PUSH_DOORS,
  type Doors as PushDoors,
} from "../credential-push/claude-account-credential-push.module.code.ts"
import {
  decideTokenTerminalAlert,
  refreshHealthMarks,
  terminalAlertMarks,
  windowTriggerMarks,
} from "../health/claude-account-health.module.code.ts"
import {
  instantOf,
  pacingMarks,
  type Usage,
  usageFrom,
} from "../marking/claude-account-marking.module.code.ts"
import {
  type RefreshOutcome,
  UPKEEP_RENEWAL_MARGIN_MS,
  USAGE_URL,
} from "../oauth/claude-account-oauth.module.code.ts"
import {
  credentialIn,
  everyAccountSlugIn,
  type SecretsRead,
} from "../reading/claude-account-reading.module.code.ts"
import { renewedIn } from "../renewing/claude-account-renewing.module.code.ts"

const MESSAGES_URL = "https://api.anthropic.com/v1/messages"

const HAIKU_MODEL = "claude-haiku-4-5-20251001"

const USER_AGENT = "claude-code/2.1.63"

const ANTHROPIC_BETA = "oauth-2025-04-20"

const ANTHROPIC_VERSION = "2023-06-01"

const HTTP_TIMEOUT_MS = 10_000

const RATE_LIMITED = 429

const ANSWERED = 200

const ONE_TOKEN = 1

const PING_TEXT = "."

const DEFAULT_LOG_PREFIX = "[upkeep]"

const NO_CODE = "unknown"

export const INTER_ACCOUNT_DELAY_MS: number = 60_000

export const RETRY_BACKOFF_MS: readonly number[] = [10_000, 30_000]

export class RateLimited extends Error {
  readonly url: string

  constructor(url: string) {
    super(`the endpoint at ${url} answered ${RATE_LIMITED}`)
    this.name = "RateLimited"
    this.url = url
  }
}

export type Triggered = { readonly ok: true } | { readonly ok: false; readonly status: number }

export type Doors = {
  readonly secretsRead: SecretsRead
  readonly push: PushDoors
  readonly usageFetch: (accessToken: string) => Promise<UsageRead>
  readonly windowTriggered: (accessToken: string) => Promise<Triggered>
  readonly now: () => number
  readonly slept: (ms: number) => Promise<undefined>
  readonly said: (line: string) => undefined
  readonly warned: (line: string) => undefined
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function windowInactive(resetsAt: string | null, now: number): boolean {
  if (resetsAt === null || resetsAt === "") return true
  const at = Date.parse(resetsAt)
  if (Number.isNaN(at)) return true
  return at <= now
}

export function shouldTriggerWindow(usage: Usage, now: number): boolean {
  return (
    windowInactive(usage.fiveHour.resetsAt, now) || windowInactive(usage.sevenDay.resetsAt, now)
  )
}

export function inAccountOrder<T extends { readonly slug: string }>(
  every: readonly T[]
): readonly T[] {
  return [...every].sort((one, two) => one.slug.localeCompare(two.slug))
}

export async function retriedOn429<T>(args: {
  readonly tried: () => Promise<T>
  readonly label: string
  readonly warned: (line: string) => undefined
  readonly slept: (ms: number) => Promise<undefined>
  readonly backoffMs?: readonly number[]
}): Promise<T> {
  const backoffMs = args.backoffMs ?? RETRY_BACKOFF_MS
  for (let attempt = 0; ; attempt++) {
    try {
      return await args.tried()
    } catch (thrown) {
      if (!(thrown instanceof RateLimited)) throw thrown
      if (attempt >= backoffMs.length) throw thrown
      const waiting = backoffMs[attempt] ?? 0
      args.warned(
        `${args.label} was rate-limited; waiting ${waiting}ms before try ${attempt + 1} of ${backoffMs.length}`
      )
      await args.slept(waiting)
    }
  }
}

export async function windowTriggeredFor(accessToken: string): Promise<Triggered> {
  const answered = await fetch(MESSAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "anthropic-beta": ANTHROPIC_BETA,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: HAIKU_MODEL,
      max_tokens: ONE_TOKEN,
      messages: [{ role: "user", content: PING_TEXT }],
    }),
    signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
  })
  if (answered.status === RATE_LIMITED) throw new RateLimited(MESSAGES_URL)
  if (answered.status !== ANSWERED) return { ok: false, status: answered.status }
  return { ok: true }
}

export const DOORS: Doors = {
  secretsRead: secretsIn,
  push: PUSH_DOORS,
  usageFetch: usageFetched,
  windowTriggered: windowTriggeredFor,
  now: () => Date.now(),
  slept: (ms) =>
    new Promise<undefined>((resolve) => {
      setTimeout(() => resolve(undefined), ms)
    }),
  said: (line) => {
    console.log(line)
  },
  warned: (line) => {
    console.error(line)
  },
}

async function usageReadFor(doors: Doors, accessToken: string): Promise<Usage> {
  const read = await doors.usageFetch(accessToken)
  if (read.kind === "refused") {
    if (read.status === RATE_LIMITED) throw new RateLimited(USAGE_URL)
    throw new Error(`the usage endpoint answered ${read.status}`)
  }
  if (read.kind === "threw") {
    throw new Error(`the usage endpoint could not be reached: ${sayOf(read.error)}`)
  }
  const usage = usageFrom(read.body)
  if (usage === null) {
    throw new Error("the usage the endpoint answered is no usage the wire shape holds")
  }
  return usage
}

function alertedOn(args: {
  readonly root: string
  readonly slug: string
  readonly doors: Doors
  readonly outcome: RefreshOutcome
  readonly accessTokenExpiresAtMs: number | null
  readonly alreadyAlertedAtMs: number | null
  readonly logPrefix: string
}): undefined {
  const { root, slug, doors, outcome, logPrefix } = args
  const nowMs = doors.now()
  const action = decideTokenTerminalAlert({
    refreshTerminal: !outcome.ok && outcome.terminal,
    refreshOk: outcome.ok,
    accessTokenExpiresAtMs: args.accessTokenExpiresAtMs,
    alreadyAlertedAtMs: args.alreadyAlertedAtMs,
    nowMs,
  })
  if (action === "alert") {
    const code = outcome.ok ? null : (outcome.code ?? null)
    doors.warned(
      `${logPrefix} ${slug}: its refresh is dead and its access token has expired (code=${code ?? NO_CODE})`
    )
    markedOn(root, doors, slug, terminalAlertMarks(instantOf(nowMs)), logPrefix)
    return
  }
  if (action === "clear-latch") {
    doors.said(`${logPrefix} ${slug}: its token re-authed, so the terminal alert latch is cleared`)
    markedOn(root, doors, slug, terminalAlertMarks(null), logPrefix)
  }
}

export async function upkeepPassFor(args: {
  readonly root: string
  readonly slug: string
  readonly doors: Doors
  readonly reading: Reading
  readonly pageOf: PageOf
  readonly logPrefix?: string
}): Promise<undefined> {
  const { root, slug, doors, reading, pageOf } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX

  const held = credentialIn(root, slug, doors.secretsRead)
  if (held.kind === "absent") {
    doors.warned(`${logPrefix} ${slug} could not be read off its page: ${held.why}`)
    return
  }
  const credential = held.credential
  if (credential.subscriptionDisabledReason !== null) {
    doors.said(
      `${logPrefix} ${slug}: its subscription is withdrawn, so this tick passes it over — ${credential.subscriptionDisabledReason}`
    )
    return
  }

  const outcome = await renewedIn({
    root,
    slug,
    doors: {
      secretsRead: doors.secretsRead,
      push: doors.push,
      now: doors.now,
      warned: doors.warned,
    },
    reading,
    pageOf,
    logPrefix,
    marginMs: UPKEEP_RENEWAL_MARGIN_MS,
  })
  markedOn(root, doors, slug, refreshHealthMarks(outcome, doors.now()), logPrefix)
  alertedOn({
    root,
    slug,
    doors,
    outcome,
    accessTokenExpiresAtMs: credential.accessTokenExpiresAtMs,
    alreadyAlertedAtMs: credential.terminalAlertedAtMs,
    logPrefix,
  })
  if (!outcome.ok) {
    doors.warned(`${logPrefix} ${slug}: its token was not renewed, so this tick passes it over`)
    return
  }
  const accessToken = outcome.credential.accessToken

  let usage: Usage
  try {
    usage = await retriedOn429({
      tried: () => usageReadFor(doors, accessToken),
      label: `${logPrefix} the usage read for ${slug}`,
      warned: doors.warned,
      slept: doors.slept,
    })
  } catch (thrown) {
    doors.warned(`${logPrefix} ${slug}: its usage was not read: ${sayOf(thrown)}`)
    return
  }

  if (shouldTriggerWindow(usage, doors.now())) {
    try {
      const ping = await retriedOn429({
        tried: () => doors.windowTriggered(accessToken),
        label: `${logPrefix} the window trigger for ${slug}`,
        warned: doors.warned,
        slept: doors.slept,
      })
      if (ping.ok) {
        usage = await retriedOn429({
          tried: () => usageReadFor(doors, accessToken),
          label: `${logPrefix} the usage read after the window trigger for ${slug}`,
          warned: doors.warned,
          slept: doors.slept,
        })
      } else {
        doors.warned(`${logPrefix} ${slug}: its window trigger was answered ${ping.status}`)
      }
    } catch (thrown) {
      doors.warned(`${logPrefix} ${slug}: its window was not triggered: ${sayOf(thrown)}`)
    }
    markedOn(root, doors, slug, windowTriggerMarks(doors.now()), logPrefix)
  }

  markedOn(root, doors, slug, pacingMarks(doors.now(), usage), logPrefix)
}

export async function upkeepPassIn(args: {
  readonly root: string
  readonly doors: Doors
  readonly logPrefix?: string
}): Promise<undefined> {
  const { root, doors } = args
  const logPrefix = args.logPrefix ?? DEFAULT_LOG_PREFIX
  const every = inAccountOrder(everyAccountSlugIn(root).map((slug) => ({ slug })))
  if (every.length === 0) {
    throw new Error(
      `no claude-account page stands under ${root}, and renewing a token happens here and ` +
        "nowhere else, so a pass over none of them renews nothing in the whole fleet — " +
        "answering that as a done tick would read healthy while every token ages out"
    )
  }
  const reading = readingIn(root)
  const pageOf: PageOf = (path) => valueAt(path, root)
  doors.said(`${logPrefix} starting a tick over ${every.length} accounts`)
  for (let index = 0; index < every.length; index++) {
    const one = every[index]
    if (one === undefined) continue
    if (index > 0) await doors.slept(INTER_ACCOUNT_DELAY_MS)
    doors.said(`${logPrefix} ${index + 1}/${every.length} ${one.slug}`)
    await upkeepPassFor({ root, slug: one.slug, doors, reading, pageOf, logPrefix })
  }
  doors.said(`${logPrefix} the tick is complete`)
}
