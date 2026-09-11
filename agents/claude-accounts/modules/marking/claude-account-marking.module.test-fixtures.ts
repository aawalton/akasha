import { mkdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
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
} from "akasha/agents/claude-accounts/modules/marking/claude-account-marking.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { PageOf } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  pageFiled,
  shapeAdded,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import type { Child, Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

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
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
    ...said,
  }
}

export function bodied(name: string, held: unknown): string {
  return `export const ${name} = ${JSON.stringify(held, null, 2)} as const\n`
}

export function typeWritten(
  root: string,
  id: string,
  slug: string,
  at: string,
  above: readonly string[],
  declared: readonly Declared[]
): undefined {
  writing(
    root,
    at,
    bodied("typed", {
      id,
      pageTypeSlug: "page-type",
      slug,
      definition: `a ${slug}`,
      pluralSlug: `${slug}s`,
      extends: above,
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
    shapeAdded(root, PROPERTY_TYPE, one.slug, [
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

export function shut(root: string, slug: string): undefined {
  const at = join(root, pageAt(slug))
  rmSync(at)
  mkdirSync(at)
}

function idFor(slug: string): string {
  return `01a06351-0000-7000-8000-00000000000${slug.length}`
}

export function accountWritten(
  root: string,
  slug: string,
  beside: Record<string, unknown> | null
): undefined {
  const value = { id: idFor(slug), pageTypeSlug: "claude-account", slug, email: `${slug}@a.test` }
  writing(root, pageAt(slug), bodied(slug, value))
  if (beside !== null) writing(root, besideAt(slug), bodied("held", beside))
  listedFiled(root, "claude-account", slug, [{ path: pageAt(slug), id: idFor(slug) }])
  valueAlsoFiled(root, "claude-account", [{ path: pageAt(slug), value }])
}

export function bareTypeIn(prefix: string): string {
  const root = rootFor(prefix)
  typeWritten(root, ACCOUNT_TYPE, "claude-account", TYPE_AT, [], [])
  return root
}

export function worldIn(root: string, declared: readonly Declared[] = ACCOUNT_DECLARED): string {
  typeWritten(root, ABOVE_TYPE, "page", ABOVE_AT, [], ABOVE_DECLARED)
  typeWritten(root, ACCOUNT_TYPE, "claude-account", TYPE_AT, ["page-type/page"], declared)
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
      holds: (at: string): boolean => {
        seen.push(`holds ${at}`)
        return real.holds(at)
      },
      listing: (at: string): readonly Child[] => {
        seen.push(`listing ${at}`)
        return real.listing(at)
      },
      lines: (at: string): readonly string[] => {
        seen.push(`lines ${at}`)
        return real.lines(at)
      },
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

export const CARRIED_THREE: readonly Carried[] = [
  carriedOf("terminalAt", { uncommitted: true }),
  carriedOf("accessToken", { secret: true }),
  carriedOf("email"),
]

export const CARRIED_BOTH: readonly Carried[] = [
  carriedOf("accessToken", { secret: true, uncommitted: true }),
]

export const DECLARED_WITHOUT_PACING: readonly Declared[] = ACCOUNT_DECLARED.map((one) =>
  one.slug === "five-hour-percent-used" ? { slug: one.slug } : one
)

export const DECLARED_WITH_WEATHER: readonly Declared[] = [
  ...ACCOUNT_DECLARED,
  { slug: "weather-noted-at", uncommitted: true },
]

export const PROTO_MARKS: Given = JSON.parse('{"__proto__":"x"}')

export function typelessWorld(): string {
  const root = bareTypeIn("marking-typeless-")
  accountWritten(root, "aine", null)
  return root
}

export function besideBroken(root: string): undefined {
  writing(root, besideAt("aine"), "this is not a page body\n")
}

export function shutWorld(): string {
  const root = worldMade()
  for (const one of ["aine", "aow"]) shut(root, one)
  return root
}

export type RoutedWorld = { readonly root: string; readonly routing: Routing }

export function routedWorld(): RoutedWorld {
  const root = worldMade()
  return { root, routing: routedFor(root) }
}

export type CountedWorld = RoutedWorld & { readonly one: Counted; readonly held: PageOf }

export function countedWorld(): CountedWorld {
  const world = routedWorld()
  return { ...world, one: counting(world.root), held: bodiesIn(world.root) }
}
