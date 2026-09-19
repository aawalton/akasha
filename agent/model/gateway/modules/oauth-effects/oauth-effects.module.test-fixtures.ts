import { mkdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { bodied } from "akasha/agent/model/account/modules/marking/model-account-marking.module.test-fixtures.ts"
import { ANTHROPIC } from "akasha/agent/model/account/modules/reading/model-account-reading.module.code.ts"
import type {
  Doors,
  UsageRead,
} from "akasha/agent/model/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import type { OAuthCredential } from "akasha/agent/model/gateway/modules/oauth-types/oauth-types.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import {
  pageFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const ACCOUNT_TYPE = "01a054d8-1d38-788f-a073-7cf3603acd3f"

const ABOVE_TYPE = "01a049b9-856c-7090-bd14-5a916f574259"

const TYPE_AT = "akasha/agent/model/account/model-account.page-type.ts"

const ABOVE_AT = "akasha/pages-system/pages/page.page-type.ts"

const PROPERTY_TYPE = "text-property"

const PAGES_AT = "akasha/agent/model/account/pages"

const ABOVE = `${pageType.slug}/${page.slug}`

export const FAKE_ACCESS = "fake-access-token-for-a-test"

export const FAKE_REFRESH = "fake-refresh-token-for-a-test"

export const NOW = Date.parse("2026-09-02T12:00:00.000Z")

const MS_AN_HOUR = 3_600_000

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

function typeWritten(
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
  return `${PAGES_AT}/${slug}/${slug}.model-account.ts`
}

function besideAt(slug: string): string {
  return `${PAGES_AT}/${slug}/${slug}.model-account.uncommitted.ts`
}

export function shut(root: string, slug: string): undefined {
  const at = join(root, pageAt(slug))
  rmSync(at)
  mkdirSync(at)
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
  const value = {
    id: idFor(slug),
    pageTypeSlug: "model-account",
    slug,
    provider: ANTHROPIC,
    email: `${slug}@a.test`,
    ...stated,
  }
  writing(root, pageAt(slug), bodied(slug, value))
  if (beside !== null) writing(root, besideAt(slug), bodied("held", beside))
  listedFiled(root, "model-account", slug, [{ path: pageAt(slug), id: idFor(slug) }])
  valueAlsoFiled(root, "model-account", [{ path: pageAt(slug), value }])
}

const scratch = scratchWorld()

export const sweep = scratch.sweep

export function rootFor(prefix: string): string {
  return scratch.rootFor(prefix)
}

export function worldMade(): string {
  const root = rootFor("oauth-effects-")
  typeWritten(root, ABOVE_TYPE, "page", ABOVE_AT, [], ABOVE_DECLARED)
  typeWritten(root, ACCOUNT_TYPE, "model-account", TYPE_AT, [ABOVE], ACCOUNT_DECLARED)
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
    secretsRead: (root, at) => {
      pages.push(at)
      return reading(root, at)
    },
  }
  return { doors, said: saidLines, warned: warnedLines, asked, pages }
}

function secretsHeld(): ReadonlyMap<string, string> {
  return new Map([
    ["access-token", FAKE_ACCESS],
    ["refresh-token", FAKE_REFRESH],
  ])
}

export function secretsMissing(slug: string): Doors["secretsRead"] {
  return (root, at) => (join(root, at).includes(`/${slug}/`) ? null : secretsHeld())
}

export function refuse(): never {
  throw new Error("nothing here reaches an account")
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
