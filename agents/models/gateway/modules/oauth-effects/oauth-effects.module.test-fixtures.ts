import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled, pageFiled, schemaFiled } from "@akasha/indexes/testing"
import { uncommittedIn } from "@akasha/pages-system/page-uncommitted"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import type { Doors, UsageRead } from "./oauth-effects.module.code.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const ABOVE_TYPE = "01a049b9-856c-7090-bd14-5a916f574259"

const TYPE_AT = "akasha/agents/claude-accounts/claude-account.page-type.ts"

const ABOVE_AT = "akasha/pages-system/pages/page.page-type.ts"

const PROPERTY_TYPE = "text-property"

export const PAGES_AT = "akasha/agents/claude-accounts/pages"

export const FAKE_ACCESS = "fake-access-token-for-a-test"

export const FAKE_REFRESH = "fake-refresh-token-for-a-test"

export const NOW = Date.parse("2026-09-02T12:00:00.000Z")

export const MS_AN_HOUR = 3_600_000

export const RESETS_AT = "2026-09-05T00:00:00.000Z"

type Declared = {
  readonly slug: string
  readonly secret?: boolean
  readonly uncommitted?: boolean
}

const ABOVE_DECLARED: readonly Declared[] = [
  { slug: "id" },
  { slug: "page-type-slug" },
  { slug: "slug" },
]

const STATED_SLUGS = ["email", "subscription-type", "rate-limit-tier", "scopes"]

const BESIDE_SLUGS = [
  "access-token-expires-at",
  "five-hour-percent-used",
  "seven-day-percent-used",
  "five-hour-resets-at",
  "seven-day-resets-at",
  "five-hour-started-at",
  "seven-day-started-at",
  "retry-allowed-at",
  "usage-read-at",
  "subscription-disabled-reason",
  "terminal-at",
]

const ACCOUNT_DECLARED: readonly Declared[] = [
  ...STATED_SLUGS.map((slug) => ({ slug })),
  { slug: "access-token", secret: true },
  { slug: "refresh-token", secret: true },
  ...BESIDE_SLUGS.map((slug) => ({ slug, uncommitted: true })),
]

export type Stated = Record<string, unknown>

export type Beside = Record<string, unknown>

function bodied(name: string, held: unknown): string {
  return `export const ${name} = ${JSON.stringify(held, null, 2)} as const\n`
}

export function filed(root: string, at: string, text: string): undefined {
  mkdirSync(dirname(join(root, at)), { recursive: true })
  writeFileSync(join(root, at), text)
}

function typeWritten(
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
  return `01a063af-0000-7000-8000-0000000000${String(slug.length).padStart(2, "0")}`
}

export function accountWritten(
  root: string,
  slug: string,
  stated: Stated,
  beside: Beside | null
): undefined {
  filed(
    root,
    pageAt(slug),
    bodied(slug, {
      id: idFor(slug),
      pageTypeSlug: "claude-account",
      slug,
      email: `${slug}@a.test`,
      ...stated,
    })
  )
  if (beside !== null) filed(root, besideAt(slug), bodied("held", beside))
  listedFiled(root, "claude-account", slug, [{ path: pageAt(slug), id: idFor(slug) }])
}

export function besideHeld(root: string, slug: string): Record<string, unknown> {
  return uncommittedIn(root, pageAt(slug)) ?? {}
}

const scratch = scratchWorld()

export const sweep = scratch.sweep

export function rootFor(prefix: string): string {
  return scratch.rootFor(prefix)
}

export function worldMade(): string {
  const root = rootFor("oauth-effects-")
  typeWritten(root, ABOVE_TYPE, "page", ABOVE_AT, null, ABOVE_DECLARED)
  typeWritten(root, ACCOUNT_TYPE, "claude-account", TYPE_AT, "page-type/page", ACCOUNT_DECLARED)
  accountWritten(
    root,
    "aine",
    { subscriptionType: "max", rateLimitTier: "default", scopes: ["user:inference"] },
    {
      accessTokenExpiresAt: "2026-09-02T20:00:00.000Z",
      fiveHourPercentUsed: 12,
      sevenDayPercentUsed: 80,
      sevenDayResetsAt: RESETS_AT,
      fiveHourResetsAt: "2026-09-02T15:00:00.000Z",
    }
  )
  accountWritten(
    root,
    "ctw",
    { subscriptionType: "max" },
    {
      accessTokenExpiresAt: "2026-09-02T20:00:00.000Z",
      fiveHourPercentUsed: 0,
      sevenDayPercentUsed: 10,
      sevenDayResetsAt: RESETS_AT,
    }
  )
  accountWritten(root, "zed", {}, { accessTokenExpiresAt: "2026-09-02T20:00:00.000Z" })
  return root
}

export type Sink = {
  readonly doors: Doors
  readonly said: string[]
  readonly warned: string[]
  readonly asked: string[]
  readonly pages: string[]
}

export function usageBody(fiveHour: number, sevenDay: number): unknown {
  return {
    five_hour: { utilization: fiveHour, resets_at: RESETS_AT },
    seven_day: { utilization: sevenDay, resets_at: RESETS_AT },
  }
}

export function doorsWith(
  said: Partial<Doors> = {},
  usage: readonly UsageRead[] = [{ kind: "read", body: usageBody(12, 40) }]
): Sink {
  const saidLines: string[] = []
  const warnedLines: string[] = []
  const asked: string[] = []
  const pages: string[] = []
  const reading = said.secretsRead ?? (() => secretsHeld())
  let turn = 0
  const doors: Doors = {
    usageFetch: async (token) => {
      asked.push(token)
      const answer = usage[Math.min(turn, usage.length - 1)]
      turn += 1
      return answer ?? { kind: "threw", error: new Error("no answer staged") }
    },
    now: () => NOW,
    said: (line) => {
      saidLines.push(line)
    },
    warned: (line) => {
      warnedLines.push(line)
    },
    ...said,
    secretsRead: (root, page) => {
      pages.push(page)
      return reading(root, page)
    },
  }
  return { doors, said: saidLines, warned: warnedLines, asked, pages }
}

export function secretsHeld(): ReadonlyMap<string, string> {
  return new Map([
    ["access-token", FAKE_ACCESS],
    ["refresh-token", FAKE_REFRESH],
  ])
}

export function secretsMissing(slug: string): Doors["secretsRead"] {
  return (root, page) => (join(root, page).includes(`/${slug}/`) ? null : secretsHeld())
}

export async function tokenHanded(account: string): Promise<OAuthCredential | null> {
  return {
    account,
    accessToken: FAKE_ACCESS,
    refreshToken: FAKE_REFRESH,
    expiresAt: NOW + MS_AN_HOUR,
    scopes: [],
    subscriptionType: null,
    rateLimitTier: null,
  }
}
