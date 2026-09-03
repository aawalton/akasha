import { exportedAs, typedAs } from "@akasha/pages-system/page-export-name"
import type { MonarchAccount, MonarchCategory, MonarchHolding, MonarchTag } from "./client.ts"
import {
  ACCOUNT_FOLDER,
  CATEGORY_FOLDER,
  HOLDING_FOLDER,
  TAG_FOLDER,
  accountPages,
  categoryPages,
  holdingPages,
  keyOf,
  tagPages,
} from "./files.ts"
import type { PageFile } from "./files.ts"
import type { WriteItem } from "./land-files.ts"
import { through } from "./land-files.ts"

export type Value = string | number | boolean

function written(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map((one) => written(one)).join(", ")}]`
  return JSON.stringify(value)
}

export function slugify(text: string): string {
  const parts = text
    .replace(/\(\.\.\.(\w+)\)/g, " $1")
    .replace(/&/g, " and ")
    .replace(/[’']/g, "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter((part) => part !== "")
  return parts.filter((part, at) => part !== parts[at - 1]).join("-")
}

function disambiguated(base: string, monarchId: string, taken: ReadonlySet<string>): string {
  const stem = base === "" ? "account" : base
  if (!taken.has(stem)) return stem
  return `${stem}-${monarchId.slice(-6)}`
}

/** The keys a page states, in the order a page states them. */
const AHEAD = ["id", "pageTypeSlug", "slug", "title", "definition", "monarchId"]

function ordered(value: Readonly<Record<string, unknown>>): readonly string[] {
  const rest = Object.keys(value).filter((key) => !AHEAD.includes(key))
  return [...AHEAD.filter((key) => key in value), ...rest]
}

/**
 * A page is one TypeScript file holding one exported object named for the page's slug. This
 * composes the whole body rather than patching a line of it, because there is no frontmatter to
 * patch any more: what a page states, it states in that one object.
 */
/** The width the formatter wraps a line at, stated once in `biome.json`. */
const WIDTH = 100

/** A value whose line runs past the width stands on a line of its own, as the formatter puts it. */
function stated(key: string, value: unknown): readonly string[] {
  const said = written(value)
  const one = `  ${key}: ${said},`
  return one.length <= WIDTH ? [one] : [`  ${key}:`, `    ${said},`]
}

export function pageText(
  pageTypeSlug: string,
  value: Readonly<Record<string, unknown>>
): string {
  const slug = String(value.slug)
  const lines = ordered(value).flatMap((key) => stated(key, value[key]))
  return [
    `import type { ${typedAs(pageTypeSlug)} } from "../${pageTypeSlug}.page-type.ts"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    ...lines,
    `} as const satisfies ${typedAs(pageTypeSlug)}`,
    "",
  ].join("\n")
}

export interface Wanted {
  readonly monarchId: string
  readonly title: string
  readonly slugFrom: string
  readonly values: Readonly<Record<string, Value>>
  readonly definition: string
}

function minted(pageTypeSlug: string, slug: string, wanted: Wanted, defined: boolean): string {
  return pageText(pageTypeSlug, {
    id: Bun.randomUUIDv7(),
    pageTypeSlug,
    slug,
    title: wanted.title,
    ...(defined ? { definition: wanted.definition } : {}),
    monarchId: wanted.monarchId,
    ...wanted.values,
  })
}

export interface Landing {
  readonly items: readonly WriteItem[]
  readonly minted: readonly string[]
  readonly changed: readonly string[]
  readonly slugs: ReadonlyMap<string, string>
}

function namedForType(pageTypeSlug: string, slug: string): string {
  return `${slug}.${pageTypeSlug}.ts`
}

export async function landing(
  pageTypeSlug: string,
  folder: string,
  standing: readonly PageFile[],
  wanted: readonly Wanted[],
  defined: boolean = true
): Promise<Landing> {
  const byMonarchId = new Map<string, PageFile>()
  const taken = new Set<string>()
  for (const page of standing) {
    taken.add(page.slug)
    const id = keyOf(page, "monarchId")
    if (id !== null && id !== "") byMonarchId.set(id, page)
  }
  const items: WriteItem[] = []
  const made: string[] = []
  const moved: string[] = []
  const slugs = new Map<string, string>()
  const once = new Map<string, Wanted>()
  for (const one of wanted) if (!once.has(one.monarchId)) once.set(one.monarchId, one)
  for (const one of once.values()) {
    const page = byMonarchId.get(one.monarchId)
    if (page === undefined) {
      const slug = disambiguated(slugify(one.slugFrom), one.monarchId, taken)
      taken.add(slug)
      slugs.set(one.monarchId, slug)
      items.push({
        file_path: `${folder}/${namedForType(pageTypeSlug, slug)}`,
        content: minted(pageTypeSlug, slug, one, defined),
      })
      made.push(slug)
      continue
    }
    slugs.set(one.monarchId, page.slug)
    const drifted: Record<string, Value> = {}
    for (const [name, held] of Object.entries(one.values)) {
      if (keyOf(page, name) !== String(held)) drifted[name] = held
    }
    if (Object.keys(drifted).length === 0) continue
    items.push({
      file_path: page.path,
      content: pageText(pageTypeSlug, { ...page.value, ...drifted }),
    })
    moved.push(`${page.slug} (${Object.keys(drifted).join(", ")})`)
  }
  return { items, minted: made, changed: moved, slugs }
}

export function accountWanted(a: MonarchAccount): Wanted {
  return {
    monarchId: a.id,
    title: a.displayName,
    slugFrom: a.displayName,
    values: {
      accountDisplayName: a.displayName,
      currentBalance: a.currentBalance,
      accountType: a.typeName,
      asset: a.isAsset,
      accountActive: a.deactivatedAt === null && !a.syncDisabled,
      accountHidden: a.isHidden,
    },
    definition: `one balance Monarch reports as ${a.typeName}.`,
  }
}

export function categoryWanted(c: MonarchCategory): Wanted {
  const values: Record<string, Value> = {}
  if (c.groupName !== null) values.categoryGroup = c.groupName
  if (c.groupType !== null) values.categoryGroupType = c.groupType
  return {
    monarchId: c.id,
    title: c.name,
    slugFrom: c.name,
    values,
    definition: `money counted as ${c.name}.`,
  }
}

export function tagWanted(t: MonarchTag): Wanted {
  const values: Record<string, Value> = {}
  if (t.color !== null) values.tagColour = t.color
  if (t.order !== null) values.tagPlace = t.order
  return {
    monarchId: t.id,
    title: t.name,
    slugFrom: t.name,
    values,
    definition: `the tag marking a transaction as ${t.name}.`,
  }
}

export function holdingWanted(accountSlug: string, h: MonarchHolding): Wanted {
  const values: Record<string, Value> = {
    accountSlug,
    securityName: h.securityName,
    quantity: h.quantity,
    costBasis: h.basis ?? 0,
    holdingValue: h.totalValue,
  }
  if (h.ticker !== null) values.ticker = h.ticker
  return {
    monarchId: h.id,
    title: h.ticker ?? h.securityName,
    slugFrom: h.ticker ?? h.securityName,
    values,
    definition: `the ${h.ticker ?? h.securityName} units standing in ${accountSlug}.`,
  }
}

function say(what: string, held: Landing): void {
  if (held.minted.length > 0) {
    console.log(
      `  ${held.minted.length} new ${what} file(s) minted with a plain definition, which wants ` +
        `reading: ${held.minted.join(", ")}`
    )
  }
  if (held.changed.length > 0) console.log(`  ${held.changed.length} ${what} file(s) moved`)
  if (held.items.length === 0) console.log(`  every ${what} file already says what Monarch says`)
}

export async function landAccountFiles(
  accounts: readonly MonarchAccount[]
): Promise<ReadonlyMap<string, string>> {
  const held = await landing(
    "monarch-account",
    ACCOUNT_FOLDER,
    await accountPages(),
    accounts.map(accountWanted)
  )
  say("account", held)
  if (held.items.length > 0) {
    await through(held.items, `monarch: ${held.items.length} account file(s) from the sync`)
  }
  return held.slugs
}

export async function landCategoryFiles(
  categories: readonly MonarchCategory[]
): Promise<ReadonlyMap<string, string>> {
  const held = await landing(
    "monarch-category",
    CATEGORY_FOLDER,
    await categoryPages(),
    categories.map(categoryWanted)
  )
  say("category", held)
  if (held.items.length > 0) {
    await through(held.items, `monarch: ${held.items.length} category file(s) from the sync`)
  }
  return held.slugs
}

export async function landTagFiles(
  tags: readonly MonarchTag[]
): Promise<ReadonlyMap<string, string>> {
  const held = await landing("monarch-tag", TAG_FOLDER, await tagPages(), tags.map(tagWanted))
  say("tag", held)
  if (held.items.length > 0) {
    await through(held.items, `monarch: ${held.items.length} tag file(s) from the sync`)
  }
  return held.slugs
}

export async function landHoldingFiles(
  holdings: readonly { readonly accountSlug: string; readonly holding: MonarchHolding }[]
): Promise<ReadonlyMap<string, string>> {
  const held = await landing(
    "monarch-holding",
    HOLDING_FOLDER,
    await holdingPages(),
    holdings.map((one) => holdingWanted(one.accountSlug, one.holding)),
    false
  )
  say("holding", held)
  if (held.items.length > 0) {
    await through(held.items, `monarch: ${held.items.length} holding file(s) from the sync`)
  }
  return held.slugs
}
