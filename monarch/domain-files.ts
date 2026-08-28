import { readFile } from "node:fs/promises"
import { newPageNameFor } from "../page/page-types.ts"
import { registryOf } from "../page/property/registry.ts"
import { diskFileTree } from "../page/file-tree.ts"
import { resolveRoots } from "../repo/roots/roots.ts"
import { join } from "node:path"
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

const BARE = /^[a-z][a-z0-9-]*$/
const YAML_WORDS = new Set(["true", "false", "null", "yes", "no", "on", "off", "y", "n"])

function quoted(value: Value): string {
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (BARE.test(value) && !YAML_WORDS.has(value)) return value
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

export function withFrontmatter(text: string, values: Readonly<Record<string, Value>>): string {
  const lines = text.split("\n")
  if (lines[0] !== "---") throw new Error("this page carries no frontmatter to write into")
  const close = lines.indexOf("---", 1)
  if (close === -1) throw new Error("this page's frontmatter never closes")
  const head = lines.slice(1, close)
  const left = new Map(Object.entries(values))
  const written = head.map((line) => {
    const name = /^([a-z0-9-]+):/.exec(line)?.[1]
    if (name === undefined || !left.has(name)) return line
    const held = left.get(name) as Value
    left.delete(name)
    return `${name}: ${quoted(held)}`
  })
  for (const [name, held] of left) written.push(`${name}: ${quoted(held)}`)
  return ["---", ...written, "---", ...lines.slice(close + 1)].join("\n")
}

export interface Wanted {
  readonly monarchId: string
  readonly title: string
  readonly slugFrom: string
  readonly values: Readonly<Record<string, Value>>
  readonly definition: string
}

function minted(pageTypeSlug: string, slug: string, wanted: Wanted, defined: boolean): string {
  const keys = Object.entries(wanted.values).map(([name, held]) => `${name}: ${quoted(held)}`)
  const head = [
    "---",
    `page-type-slug: ${pageTypeSlug}`,
    `title: ${JSON.stringify(wanted.title)}`,
    `slug: ${quoted(slug)}`,
    ...(defined ? [`domain-parent-slug: ${pageTypeSlug}`] : []),
    `monarch-id: ${JSON.stringify(wanted.monarchId)}`,
    ...keys,
    "---",
    "",
  ]
  if (!defined) return head.join("\n")
  return [...head, "# Definition", "", `- **${wanted.title}** — ${wanted.definition}`, ""].join("\n")
}

export interface Landing {
  readonly items: readonly WriteItem[]
  readonly minted: readonly string[]
  readonly changed: readonly string[]
  readonly slugs: ReadonlyMap<string, string>
}

function namedForType(pageTypeSlug: string, slug: string): string {
  const type = registryOf(diskFileTree(resolveRoots())).find((one) => one.slug === pageTypeSlug)
  return type === undefined ? `${slug}.md` : newPageNameFor(type, slug)
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
    const id = keyOf(page, "monarch-id")
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
    const before = await readFile(join(page.root, page.path), "utf8")
    const after = withFrontmatter(before, drifted)
    if (after === before) continue
    items.push({ file_path: page.path, content: after })
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
      "display-name": a.displayName,
      "current-balance": a.currentBalance,
      "type-name": a.typeName,
      asset: a.isAsset,
      active: a.deactivatedAt === null && !a.syncDisabled,
      hidden: a.isHidden,
    },
    definition: `one balance Monarch reports as ${a.typeName}.`,
  }
}

export function categoryWanted(c: MonarchCategory): Wanted {
  const values: Record<string, Value> = {}
  if (c.groupName !== null) values["group-name"] = c.groupName
  if (c.groupType !== null) values["group-type"] = c.groupType
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
  if (t.color !== null) values.color = t.color
  if (t.order !== null) values.order = t.order
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
    "account-slug": accountSlug,
    "security-name": h.securityName,
    quantity: h.quantity,
    "cost-basis": h.basis ?? 0,
    "total-value": h.totalValue,
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
