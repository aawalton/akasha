import { typeSlugOf } from "@akasha/indexes"
import type { PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { type Carried, propertiesOf } from "@akasha/pages-system/page-type-properties"
import { dropUncommitted, mergeUncommitted } from "@akasha/pages-system/page-uncommitted"
import { z } from "zod"
import {
  backoffExpiryMs,
  USAGE_RESPONSE_SCHEMA,
} from "../oauth/claude-account-oauth.module.code.ts"
import { computePacingDerivations } from "../pacing/claude-account-pacing.module.code.ts"
import { accountPathIn } from "../reading/claude-account-reading.module.code.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const RETRY_ALLOWED_AT = "retryAllowedAt"

const SUBSCRIPTION_DISABLED_REASON = "subscriptionDisabledReason"

const FIVE_HOUR_PERCENT_USED = "fiveHourPercentUsed"

const SEVEN_DAY_PERCENT_USED = "sevenDayPercentUsed"

const FIVE_HOUR_RESETS_AT = "fiveHourResetsAt"

const SEVEN_DAY_RESETS_AT = "sevenDayResetsAt"

const FIVE_HOUR_STARTED_AT = "fiveHourStartedAt"

const SEVEN_DAY_STARTED_AT = "sevenDayStartedAt"

const USAGE_READ_AT = "usageReadAt"

const MS_AT_MOST = 8_640_000_000_000_000

const NEWLINE = "\n"

const MARK_SHAPE = z.union([z.string(), z.number(), z.null()])

const FIELD_SHAPE = z.union([z.string(), z.number()])

const PROTO = "__proto__"

export type Field = string | number

export type Fields = Readonly<Record<string, Field>>

export type Mark = Field | Fields | null

export type Marks = Readonly<Record<string, Mark>>

export type Given = Readonly<Record<string, unknown>>

export type Routing = {
  readonly beside: ReadonlySet<string>
  readonly stated: ReadonlySet<string>
  readonly secret: ReadonlySet<string>
}

export type Sorted =
  | { readonly kind: "sorted"; readonly beside: Marks }
  | { readonly kind: "refused"; readonly why: string }

export type Marked =
  | { readonly kind: "held"; readonly slug: string; readonly keys: readonly string[] }
  | { readonly kind: "unchanged"; readonly slug: string }
  | { readonly kind: "absent"; readonly slug: string; readonly why: string }
  | { readonly kind: "refused"; readonly slug: string; readonly why: string }

export type UsageWindow = {
  readonly percentUsed: number
  readonly resetsAt: string | null
}

export type Usage = {
  readonly fiveHour: UsageWindow
  readonly sevenDay: UsageWindow
}

function sayOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function listed(keys: readonly string[]): string {
  return keys.map((one) => `\`${one}\``).join(", ")
}

export function instantOf(ms: number): string | null {
  if (!Number.isFinite(ms) || Math.abs(ms) > MS_AT_MOST) return null
  return new Date(ms).toISOString()
}

export function routingFrom(declared: readonly Carried[]): Routing {
  const beside = new Set<string>()
  const stated = new Set<string>()
  const secret = new Set<string>()
  for (const one of declared) {
    if (one.secret) secret.add(one.key)
    else if (one.uncommitted) beside.add(one.key)
    else stated.add(one.key)
  }
  return { beside, stated, secret }
}

export function routingIn(given: Reading, pageOf: PageOf): Routing {
  const slug = typeSlugOf(given, ACCOUNT_TYPE)
  const declared = propertiesOf(slug, given, pageOf)
  if (declared.length === 0) {
    throw new Error(
      `no \`${slug}\` page type could be read, and where each value a mark carries ` +
        `is written is declared there alone, so where to write one is unknown rather than the ` +
        `page body by default`
    )
  }
  return routingFrom(declared)
}

export function unfitFor(key: string, value: Mark): string | null {
  if (typeof value !== "string") return null
  if (value.includes(NEWLINE)) return `\`${key}\` carries a newline, and a mark is one line`
  if (value.trim() === "") return `\`${key}\` arrived empty, and a mark with no value is a removal`
  return null
}

export function fieldsFrom(key: string, held: unknown): Fields | string {
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    return `\`${key}\` carries what is no text, no finite number, no record and no removal`
  }
  const found: Record<string, Field> = {}
  for (const field of Object.getOwnPropertyNames(held)) {
    if (field === PROTO)
      return `\`${key}\` carries a field named \`${PROTO}\`, which no record holds`
    const said = FIELD_SHAPE.safeParse((held as Record<string, unknown>)[field])
    if (!said.success) return `\`${key}.${field}\` carries what is no text and no finite number`
    const wrong = unfitFor(`${key}.${field}`, said.data)
    if (wrong !== null) return wrong
    found[field] = said.data
  }
  if (Object.keys(found).length === 0) {
    return `\`${key}\` carries a record holding no field, and a mark with no value is a removal`
  }
  return found
}

export function sortedFrom(routing: Routing, marks: Given): Sorted {
  const beside: Record<string, Mark> = {}
  const secret: string[] = []
  const stated: string[] = []
  const unnamed: string[] = []
  const unfit: string[] = []
  for (const key of Object.getOwnPropertyNames(marks)) {
    if (routing.secret.has(key)) {
      secret.push(key)
      continue
    }
    if (routing.stated.has(key)) {
      stated.push(key)
      continue
    }
    if (!routing.beside.has(key)) {
      unnamed.push(key)
      continue
    }
    const said = MARK_SHAPE.safeParse(marks[key])
    if (!said.success) {
      const fields = fieldsFrom(key, marks[key])
      if (typeof fields === "string") {
        unfit.push(fields)
        continue
      }
      beside[key] = fields
      continue
    }
    const wrong = unfitFor(key, said.data)
    if (wrong !== null) {
      unfit.push(wrong)
      continue
    }
    beside[key] = said.data
  }
  if (unnamed.length > 0) {
    return {
      kind: "refused",
      why: `${listed(unnamed)} names nothing the claude-account page type declares, so where to write it is unknown`,
    }
  }
  if (secret.length > 0) {
    return {
      kind: "refused",
      why: `${listed(secret)} is a secret the sops file beside the page holds rather than a mark`,
    }
  }
  if (stated.length > 0) {
    return {
      kind: "refused",
      why: `${listed(stated)} is what the account states rather than a reading taken of that account, and what an account states is settled when the account is made`,
    }
  }
  const wrong = unfit[0]
  if (wrong !== undefined) return { kind: "refused", why: wrong }
  return { kind: "sorted", beside }
}

export function heldBesideIn(root: string, page: string, values: Marks): string | null {
  const held: Record<string, Field | Fields> = {}
  const dropping: string[] = []
  for (const [key, value] of Object.entries(values)) {
    if (value === null) dropping.push(key)
    else held[key] = value
  }
  try {
    if (Object.keys(held).length > 0) mergeUncommitted(root, page, held)
    if (dropping.length > 0) dropUncommitted(root, page, dropping)
  } catch (thrown) {
    return sayOf(thrown)
  }
  return null
}

export function markedIn(
  root: string,
  slug: string,
  marks: Given,
  given: Reading,
  pageOf: PageOf,
  routing?: Routing
): Marked {
  try {
    const page = accountPathIn(given, slug)
    if (page === null) {
      return {
        kind: "absent",
        slug,
        why: `no page is filed for \`${slug}\`, and a mark belongs to a page`,
      }
    }
    const sorted = sortedFrom(routing ?? routingIn(given, pageOf), marks)
    if (sorted.kind === "refused") return { kind: "refused", slug, why: sorted.why }
    const keys = Object.keys(sorted.beside).sort()
    if (keys.length === 0) return { kind: "unchanged", slug }
    const wrong = heldBesideIn(root, page, sorted.beside)
    if (wrong !== null) {
      return {
        kind: "refused",
        slug,
        why: `what is observed of \`${slug}\` was not written beside its page: ${wrong}`,
      }
    }
    return { kind: "held", slug, keys }
  } catch (thrown) {
    return {
      kind: "refused",
      slug,
      why: `the mark threw, which it is written never to do: ${sayOf(thrown)}`,
    }
  }
}

export function atLimitMarks(now: number, retryAfterHeader: string | null): Marks {
  const at = instantOf(backoffExpiryMs({ now, retryAfterHeader }))
  return at === null ? {} : { [RETRY_ALLOWED_AT]: at }
}

export function subscriptionMarks(reason: string | null): Marks {
  return { [SUBSCRIPTION_DISABLED_REASON]: reason }
}

export function usageFrom(raw: unknown): Usage | null {
  const said = USAGE_RESPONSE_SCHEMA.safeParse(raw)
  if (!said.success) return null
  return {
    fiveHour: {
      percentUsed: said.data.five_hour.utilization,
      resetsAt: said.data.five_hour.resets_at,
    },
    sevenDay: {
      percentUsed: said.data.seven_day.utilization,
      resetsAt: said.data.seven_day.resets_at,
    },
  }
}

export function pacingMarks(now: number, usage: Usage): Marks {
  const derived = computePacingDerivations({
    now,
    sevenDayUtil: usage.sevenDay.percentUsed,
    sevenDayResetsAt: usage.sevenDay.resetsAt,
    fiveHourResetsAt: usage.fiveHour.resetsAt,
  })
  return {
    [FIVE_HOUR_PERCENT_USED]: usage.fiveHour.percentUsed,
    [SEVEN_DAY_PERCENT_USED]: usage.sevenDay.percentUsed,
    [FIVE_HOUR_RESETS_AT]: usage.fiveHour.resetsAt,
    [SEVEN_DAY_RESETS_AT]: usage.sevenDay.resetsAt,
    [FIVE_HOUR_STARTED_AT]: derived.fiveHourStartedAt,
    [SEVEN_DAY_STARTED_AT]: derived.sevenDayStartedAt,
    [USAGE_READ_AT]: instantOf(now),
  }
}
