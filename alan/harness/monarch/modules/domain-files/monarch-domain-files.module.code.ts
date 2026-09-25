import { dirname } from "node:path"
import type {
  MonarchAccount,
  MonarchCategory,
  MonarchHolding,
  MonarchTag,
} from "akasha/alan/harness/monarch/modules/client/monarch-client.module.code.ts"
import type { PageFile } from "akasha/alan/harness/monarch/modules/files/monarch-files.module.code.ts"
import {
  ACCOUNT_FOLDER,
  accountPages,
  CATEGORY_FOLDER,
  categoryPages,
  HOLDING_FOLDER,
  holdingPages,
  keyOf,
  TAG_FOLDER,
  tagPages,
} from "akasha/alan/harness/monarch/modules/files/monarch-files.module.code.ts"
import type { WriteItem } from "akasha/alan/harness/monarch/modules/land-files/monarch-land-files.module.code.ts"
import { through } from "akasha/alan/harness/monarch/modules/land-files/monarch-land-files.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { bodyOf, importedFrom } from "akasha/page/modules/body/page-body.module.code.ts"
import { bodyOver } from "akasha/page/modules/body-editing/page-body-editing.module.code.ts"
import { pageStem } from "akasha/page/naming/named-for/modules/page-stem/page-stem.module.code.ts"

const MONARCH_ACCOUNT = "monarch-account"

const PAGE_TYPE = "page-type"

export type Value = string | number | boolean

export function slugify(text: string): string {
  const said = text.replace(/\(\.\.\.(\w+)\)/g, " $1").replace(/&/g, " and ")
  const parts = pageStem(said).split("-")
  return parts.filter((part, at) => part !== parts[at - 1]).join("-")
}

function disambiguated(base: string, monarchId: string, taken: ReadonlySet<string>): string {
  const stem = base === "" ? "account" : base
  if (!taken.has(stem)) return stem
  return `${stem}-${monarchId.slice(-6)}`
}

const AHEAD = ["id", "pageTypeSlug", "type", "slug", "title", "definition", "monarchId"]

function ordered(value: Readonly<Record<string, unknown>>): readonly string[] {
  const rest = Object.keys(value).filter((key) => !AHEAD.includes(key))
  return [...AHEAD.filter((key) => key in value), ...rest]
}

export function pageText(
  typesAt: string,
  pageTypeSlug: string,
  value: Readonly<Record<string, unknown>>,
  held?: PageFile
): string {
  const rendering = {
    pageTypeSlug,
    slug: String(value.slug),
    importFrom: typesAt,
    keys: ordered(value),
    values: value,
  }
  return held === undefined ? bodyOf(rendering) : bodyOver(held.root, held.path, rendering)
}

export interface Wanted {
  readonly monarchId: string
  readonly title: string
  readonly slugFrom: string
  readonly values: Readonly<Record<string, Value>>
  readonly definition: string
}

function minted(
  typesAt: string,
  pageTypeSlug: string,
  slug: string,
  wanted: Wanted,
  defined: boolean
): string {
  return pageText(typesAt, pageTypeSlug, {
    id: Bun.randomUUIDv7(),
    pageTypeSlug,
    type: namedAs(PAGE_TYPE, pageTypeSlug, null),
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

async function landing(
  pageTypeSlug: string,
  folder: string,
  already: readonly PageFile[],
  wanted: readonly Wanted[],
  defined: boolean = true
): Promise<Landing> {
  const typesAt = importedFrom(`${dirname(folder)}/${pageTypeSlug}.page-type.types.ts`)
  const byMonarchId = new Map<string, PageFile>()
  const taken = new Set<string>()
  for (const page of already) {
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
        content: minted(typesAt, pageTypeSlug, slug, one, defined),
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
      content: pageText(typesAt, pageTypeSlug, { ...page.value, ...drifted }, page),
    })
    moved.push(`${page.slug} (${Object.keys(drifted).join(", ")})`)
  }
  return { items, minted: made, changed: moved, slugs }
}

function accountWanted(a: MonarchAccount): Wanted {
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

function categoryWanted(c: MonarchCategory): Wanted {
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

function tagWanted(t: MonarchTag): Wanted {
  const values: Record<string, Value> = {}
  if (t.color !== null) values.tagColor = t.color
  if (t.order !== null) values.tagPlace = t.order
  return {
    monarchId: t.id,
    title: t.name,
    slugFrom: t.name,
    values,
    definition: `the tag marking a transaction as ${t.name}.`,
  }
}

function holdingWanted(accountSlug: string, h: MonarchHolding): Wanted {
  const values: Record<string, Value> = {
    account: namedAs(MONARCH_ACCOUNT, accountSlug, null),
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
    definition: `the ${h.ticker ?? h.securityName} units sitting in ${accountSlug}.`,
  }
}

function say(what: string, held: Landing): undefined {
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
    MONARCH_ACCOUNT,
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
