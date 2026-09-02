import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { readingIn } from "@akasha/indexes"
import type { PageOf } from "@akasha/indexes/answering"
import type { Child, Reading } from "@akasha/indexes/shape"
import { listedFiled, pageFiled, schemaFiled } from "@akasha/indexes/testing"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  type Fields,
  type Given,
  type Marked,
  type Marks,
  markedIn,
  type Routing,
  routingIn,
  sortedFrom,
  type Usage,
} from "./claude-account-marking.module.code.ts"

export const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

export const ABOVE_TYPE = "01a049b9-856c-7090-bd14-5a916f574259"

export const TYPE_AT = "akasha/agents/claude-accounts/claude-account.page-type.ts"

export const ABOVE_AT = "akasha/pages-system/pages/page.page-type.ts"

export const PAGES_AT = "akasha/agents/claude-accounts/pages"

export const PROPERTY_TYPE = "text-property"

export const RESETS_AT = "2026-09-05T00:00:00.000Z"

export const NOW = Date.parse("2026-09-02T12:00:00.000Z")

export const MS_FIVE_HOURS = 5 * 3_600_000

export const MS_A_WEEK = 7 * 24 * 3_600_000

export const MS_AT_MOST = 8_640_000_000_000_000

export type Declared = {
  readonly slug: string
  readonly secret?: boolean
  readonly uncommitted?: boolean
}

const ABOVE_DECLARED: readonly Declared[] = [
  { slug: "id" },
  { slug: "page-type-slug" },
  { slug: "slug" },
]

const STATED_SLUGS = [
  "account-uuid",
  "email",
  "alias-index",
  "subscription-type",
  "rate-limit-tier",
  "renewal-day",
  "scopes",
]

const BESIDE_SLUGS = [
  "access-token-expires-at",
  "five-hour-percent-used",
  "seven-day-percent-used",
  "five-hour-resets-at",
  "seven-day-resets-at",
  "five-hour-started-at",
  "seven-day-started-at",
  "last-window-trigger-at",
  "retry-allowed-at",
  "usage-read-at",
  "subscription-disabled-reason",
  "terminal-at",
  "terminal-alerted-at",
]

export const ACCOUNT_DECLARED: readonly Declared[] = [
  ...STATED_SLUGS.map((slug) => ({ slug })),
  { slug: "access-token", secret: true },
  { slug: "refresh-token", secret: true },
  ...BESIDE_SLUGS.map((slug) => ({ slug, uncommitted: true })),
]

export const BESIDE_KEYS: readonly string[] = [
  "accessTokenExpiresAt",
  "fiveHourPercentUsed",
  "fiveHourResetsAt",
  "fiveHourStartedAt",
  "lastWindowTriggerAt",
  "retryAllowedAt",
  "sevenDayPercentUsed",
  "sevenDayResetsAt",
  "sevenDayStartedAt",
  "subscriptionDisabledReason",
  "terminalAlertedAt",
  "terminalAt",
  "usageReadAt",
]

export const PACING_KEYS: readonly string[] = [
  "fiveHourPercentUsed",
  "fiveHourResetsAt",
  "fiveHourStartedAt",
  "sevenDayPercentUsed",
  "sevenDayResetsAt",
  "sevenDayStartedAt",
  "usageReadAt",
]

export const USAGE: Usage = {
  fiveHour: { percentUsed: 12.5, resetsAt: RESETS_AT },
  sevenDay: { percentUsed: 40, resetsAt: RESETS_AT },
}

export const USAGE_UNKNOWN: Usage = {
  fiveHour: { percentUsed: 12, resetsAt: null },
  sevenDay: { percentUsed: 40, resetsAt: null },
}

export const RAW_USAGE = {
  five_hour: { utilization: 12.5, resets_at: RESETS_AT },
  seven_day: { utilization: 40, resets_at: RESETS_AT },
}

export function rawWith(utilization: unknown): unknown {
  return { five_hour: { utilization, resets_at: null }, seven_day: USAGE.sevenDay }
}

export const NO_MARK_WHY = "no text, no finite number, no record and no removal"

export const NO_MARK: readonly unknown[] = [NaN, Infinity, -Infinity, true, undefined, [1]]

export const PAIR: Fields = { accessToken: "fake-access", refreshToken: "fake-refresh", ms: 12 }

export const NO_FIELD: readonly (readonly [unknown, string])[] = [
  [{}, "a record holding no field"],
  [{ one: true }, "`terminalAt.one` carries what is no text and no finite number"],
  [{ one: NaN }, "no finite number"],
  [{ one: "a\nb" }, "carries a newline"],
  [{ one: "   " }, "arrived empty"],
  [JSON.parse('{"__proto__":"x","one":"y"}'), "which no record holds"],
]

export function carriedOf(key: string, said: Partial<Carried> = {}): Carried {
  return {
    pagePropertySlug: key,
    pageTypeSlug: PROPERTY_TYPE,
    propertySlug: key,
    key,
    unique: null,
    declaredBy: "claude-account",
    required: false,
    many: false,
    max: null,
    total: null,
    uncommitted: false,
    secret: false,
    ...said,
  }
}

function bodied(name: string, held: unknown): string {
  return `export const ${name} = ${JSON.stringify(held, null, 2)} as const\n`
}

export function filed(root: string, at: string, text: string): undefined {
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), text)
}

export function typeWritten(
  root: string,
  id: string,
  slug: string,
  at: string,
  above: string | null,
  declared: readonly Declared[]
): undefined {
  filed(
    root,
    at,
    bodied("typed", {
      id,
      pageTypeSlug: "page-type",
      slug,
      definition: `a ${slug}`,
      pluralSlug: `${slug}s`,
      extendsSlug: above,
      properties: declared.map((one) => ({
        pagePropertySlug: one.slug,
        required: false,
        many: false,
        ...(one.secret === true ? { secret: true } : {}),
        ...(one.uncommitted === true ? { uncommitted: true } : {}),
      })),
    })
  )
  pageFiled(root, id, at)
  listedFiled(root, "page-type", slug, [{ path: at, id }])
  for (const one of declared) {
    schemaFiled(root, PROPERTY_TYPE, one.slug, [
      {
        pageTypeSlug: PROPERTY_TYPE,
        slug: one.slug,
        propertySlug: one.slug,
        targetPageTypeSlug: null,
        unique: null,
        fileName: null,
      },
    ])
  }
}

export function pageAt(slug: string): string {
  return `${PAGES_AT}/${slug}/${slug}.claude-account.ts`
}

export function besideAt(slug: string): string {
  return `${PAGES_AT}/${slug}/${slug}.claude-account.uncommitted.ts`
}

function idFor(slug: string): string {
  return `01a06351-0000-7000-8000-00000000000${slug.length}`
}

export function accountWritten(
  root: string,
  slug: string,
  beside: Record<string, unknown> | null
): undefined {
  filed(
    root,
    pageAt(slug),
    bodied(slug, { id: idFor(slug), pageTypeSlug: "claude-account", slug, email: `${slug}@a.test` })
  )
  if (beside !== null) filed(root, besideAt(slug), bodied("held", beside))
  listedFiled(root, "claude-account", slug, [{ path: pageAt(slug), id: idFor(slug) }])
}

export function bareTypeIn(prefix: string): string {
  const root = rootFor(prefix)
  typeWritten(root, ACCOUNT_TYPE, "claude-account", TYPE_AT, null, [])
  return root
}

export function worldIn(root: string, declared: readonly Declared[] = ACCOUNT_DECLARED): string {
  typeWritten(root, ABOVE_TYPE, "page", ABOVE_AT, null, ABOVE_DECLARED)
  typeWritten(root, ACCOUNT_TYPE, "claude-account", TYPE_AT, "page-type/page", declared)
  accountWritten(root, "aine", { fiveHourPercentUsed: 12, terminalAt: RESETS_AT })
  accountWritten(root, "aow", null)
  accountWritten(root, "ctw", { sevenDayPercentUsed: 40 })
  return root
}

export function besideText(root: string, slug: string): string {
  return readFileSync(join(root, besideAt(slug)), "utf8")
}

export function besideHeld(root: string, slug: string): Record<string, unknown> {
  return uncommittedIn(root, pageAt(slug)) ?? {}
}

export type Counted = { readonly reading: Reading; readonly seen: string[] }

export function counting(root: string): Counted {
  const real = readingIn(root)
  const seen: string[] = []
  return {
    reading: {
      holds: (at: string): boolean => real.holds(at),
      listing: (at: string): readonly Child[] => {
        seen.push(at)
        return real.listing(at)
      },
      lines: (at: string): readonly string[] => real.lines(at),
    },
    seen,
  }
}

export function bodiesIn(root: string): PageOf {
  return (path) => valueAt(path, root)
}

export function routedFor(root: string): Routing {
  return routingIn(readingIn(root), bodiesIn(root))
}

export function markedFor(root: string, slug: string, marks: Given, routing?: Routing): Marked {
  return markedIn(root, slug, marks, readingIn(root), bodiesIn(root), routing)
}

export function routed(said: Partial<Routing> = {}): Routing {
  return {
    beside: new Set(["terminalAt", "fiveHourPercentUsed"]),
    stated: new Set(["email"]),
    secret: new Set(["accessToken"]),
    ...said,
  }
}

const scratch = scratchWorld()

export const sweep = scratch.sweep

export const FAKE_TOKEN = "fake-access-token-for-a-test"

export function rootFor(prefix: string): string {
  return scratch.rootFor(prefix)
}

export function worldMade(declared: readonly Declared[] = ACCOUNT_DECLARED): string {
  return worldIn(rootFor("marking-"), declared)
}

export function refusalOf(routing: Routing, marks: Given): string {
  const said = sortedFrom(routing, marks)
  return said.kind === "refused" ? said.why : "sorted"
}

export function besideOf(routing: Routing, marks: Given): Marks | null {
  const said = sortedFrom(routing, marks)
  return said.kind === "sorted" ? said.beside : null
}

export function whyOf(said: Marked): string {
  return said.kind === "absent" || said.kind === "refused" ? said.why : said.kind
}

export function keysOf(said: Marked): readonly string[] {
  return said.kind === "held" ? said.keys : []
}

export function heldIn(
  root: string,
  slug: string,
  marks: Given,
  routing?: Routing
): Record<string, unknown> {
  const said = markedFor(root, slug, marks, routing)
  if (said.kind !== "held") throw new Error(whyOf(said))
  return besideHeld(root, slug)
}

export function markedWhy(root: string, slug: string, marks: Given): string {
  return whyOf(markedFor(root, slug, marks))
}
