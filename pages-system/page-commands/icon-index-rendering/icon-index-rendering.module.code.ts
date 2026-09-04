import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"

/** Every page this renders belongs under here, one folder per page, named for its slug. */
export const GENERATED_AT = "pages-system/pages-core/generated"

/** The slug of the page that reassembles the shards. Nothing outside imports a shard. */
export const AGGREGATE = "icon-search-index"

const INDEX_STEM = "entries"

const PASCAL_STEM = "pascal-to-kebab"

/** A write refuses a file at this many bytes, and it judges the body AFTER formatting it.
 *  Nothing here sees the formatted body, so this is a floor rather than the gate itself. */
const REFUSED_AT_BYTES = 15_000

export type Budget = {
  readonly bytes: number
  readonly reserve: number
}

/** Formatting explodes an entries line written long onto one line per keyword, up to about
 *  half again, so what an entries shard is packed against leaves room for that growth. The
 *  pascal bodies are already one short pair per line and land byte for byte as written. */
const INDEX_BUDGET: Budget = { bytes: 8_000, reserve: 0 }

const PASCAL_BUDGET: Budget = { bytes: 12_000, reserve: 512 }

export const SHARD_NAME = /^(entries|pascal-to-kebab)-\d\d$/

const ID_LINE = /^\s*id:\s*"([0-9a-f-]{36})",?\s*$/m

const ORDINAL_WIDTH = 2

export type Entry = {
  readonly name: string
  readonly aliases: readonly string[]
  readonly keywords: readonly string[]
}

/** One page: the code body, and the page file declaring the page that body belongs to. */
export type Staged = {
  readonly slug: string
  readonly definition: string
  readonly codeAt: string
  readonly code: string
  readonly pageAt: string
}

function stringsIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  const held: string[] = []
  for (const one of value) {
    if (typeof one === "string") held.push(one.toLowerCase())
  }
  return held
}

export function aliasNamesIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  const held: string[] = []
  for (const one of value) {
    if (typeof one === "string") held.push(one.toLowerCase())
    else if (one !== null && typeof one === "object" && "name" in one) {
      const named = (one as { readonly name: unknown }).name
      if (typeof named === "string") held.push(named.toLowerCase())
    }
  }
  return [...new Set(held)].sort()
}

export function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((one) => {
      const [first] = one
      return first === undefined ? "" : first.toUpperCase() + one.slice(1)
    })
    .join("")
}

/** The export name a page file carries, which is its slug in camel. */
export function kebabToCamel(slug: string): string {
  const [head, ...rest] = slug.split("-")
  return (head ?? "") + rest.map((one) => kebabToPascal(one)).join("")
}

export function bytesIn(text: string): number {
  return new TextEncoder().encode(text).length
}

/** Fills shards with whole lines, opening a new one before the running total would reach
 *  the budget. Every shard holds at least one line, however long that line is. */
export function packed(lines: readonly string[], budget: Budget): readonly (readonly string[])[] {
  const shards: string[][] = []
  let holding: string[] = []
  let bytes = budget.reserve
  for (const line of lines) {
    const cost = bytesIn(line) + 1
    if (holding.length > 0 && bytes + cost >= budget.bytes) {
      shards.push(holding)
      holding = []
      bytes = budget.reserve
    }
    holding.push(line)
    bytes += cost
  }
  if (holding.length > 0) shards.push(holding)
  return shards
}

export function ordinal(at: number): string {
  return String(at).padStart(ORDINAL_WIDTH, "0")
}

export function shardSlug(stem: string, at: number): string {
  return `${stem}-${ordinal(at)}`
}

function shardConst(name: string, at: number): string {
  return `${name}_${ordinal(at)}`
}

export function folderOf(slug: string): string {
  return join(GENERATED_AT, slug)
}

export function codeAtOf(slug: string): string {
  return join(folderOf(slug), `${slug}.module.code.ts`)
}

export function pageAtOf(slug: string): string {
  return join(folderOf(slug), `${slug}.module.ts`)
}

/** A page's identity is a uuid v7 that does not change when anything else about the page
 *  does, so a shard that stood before keeps the id it had and only a new one is given one. */
export function idFor(root: string, slug: string): string {
  const at = resolve(root, pageAtOf(slug))
  if (existsSync(at)) {
    const found = ID_LINE.exec(readFileSync(at, "utf8"))
    if (found?.[1] !== undefined) return found[1]
  }
  return Bun.randomUUIDv7()
}

export function pageBody(root: string, slug: string, definition: string): string {
  return `${[
    'import type { Module } from "@akasha/code-system/module"',
    "",
    `export const ${kebabToCamel(slug)} = {`,
    `  id: ${JSON.stringify(idFor(root, slug))},`,
    '  pageTypeSlug: "module",',
    `  slug: ${JSON.stringify(slug)},`,
    `  definition: ${JSON.stringify(definition)},`,
    '  code: "ts",',
    "} as const satisfies Module",
  ].join("\n")}\n`
}

function indexShard(lines: readonly string[], at: number): Staged {
  const slug = shardSlug(INDEX_STEM, at)
  const body = [`export const ${shardConst("ICON_SEARCH_INDEX", at)} = [`, ...lines, "] as const"]
  return {
    slug,
    definition: `part ${ordinal(at)} of the icons the search index holds`,
    codeAt: codeAtOf(slug),
    code: `${body.join("\n")}\n`,
    pageAt: pageAtOf(slug),
  }
}

function pascalShard(lines: readonly string[], at: number): Staged {
  const slug = shardSlug(PASCAL_STEM, at)
  const body = [`export const ${shardConst("PASCAL_TO_KEBAB", at)} = {`, ...lines, "} as const"]
  return {
    slug,
    definition: `part ${ordinal(at)} of the icon names in Pascal read as kebab`,
    codeAt: codeAtOf(slug),
    code: `${body.join("\n")}\n`,
    pageAt: pageAtOf(slug),
  }
}

/** The one page anything outside this folder imports. It reaches its shards by the path
 *  each shard's code stands at, which is a sibling folder named for that shard's slug. */
export function aggregate(indexShards: number, pascalShards: number): Staged {
  const overIndex = <T>(f: (at: number) => T): T[] =>
    Array.from({ length: indexShards }, (_unused, at) => f(at))
  const overPascal = <T>(f: (at: number) => T): T[] =>
    Array.from({ length: pascalShards }, (_unused, at) => f(at))
  const reaching = (named: string, slug: string): string =>
    `import { ${named} } from "../${slug}/${slug}.module.code.ts"`

  const body = [
    ...overIndex((at) => reaching(shardConst("ICON_SEARCH_INDEX", at), shardSlug(INDEX_STEM, at))),
    ...overPascal((at) => reaching(shardConst("PASCAL_TO_KEBAB", at), shardSlug(PASCAL_STEM, at))),
    "",
    "export const ICON_SEARCH_INDEX = [",
    ...overIndex((at) => `  ...${shardConst("ICON_SEARCH_INDEX", at)},`),
    "] as const",
    "",
    'export type IconName = (typeof ICON_SEARCH_INDEX)[number]["name"]',
    "",
    "export const ICON_NAMES: readonly IconName[] = ICON_SEARCH_INDEX.map((e) => e.name)",
    "",
    "export const PASCAL_TO_KEBAB: Readonly<Record<string, IconName>> = {",
    ...overPascal((at) => `  ...${shardConst("PASCAL_TO_KEBAB", at)},`),
    "}",
  ]

  return {
    slug: AGGREGATE,
    definition: "the icons a search over them runs against",
    codeAt: codeAtOf(AGGREGATE),
    code: `${body.join("\n")}\n`,
    pageAt: pageAtOf(AGGREGATE),
  }
}

/** A shard holds at least one line however long it is, so a single line past the budget is
 *  the one thing packing cannot absorb — which is what one icon's keywords growing without
 *  bound would look like. Everything else the budget covers. */
export function overlong(lines: readonly string[], budget: Budget, what: string): string | null {
  for (const line of lines) {
    const size = bytesIn(line)
    if (size + budget.reserve >= budget.bytes) {
      return (
        `${what} rendered to ${size} bytes on one line, which no shard of ${budget.bytes} ` +
        `bytes can hold, so nothing was staged: ${line.trim().slice(0, 120)}`
      )
    }
  }
  return null
}

export function entriesIn(iconsAt: string): readonly Entry[] {
  const files = readdirSync(iconsAt)
    .filter((one) => one.endsWith(".json"))
    .sort()
  const entries: Entry[] = []
  for (const file of files) {
    const name = file.replace(/\.json$/, "")
    const read: unknown = JSON.parse(readFileSync(join(iconsAt, file), "utf8"))
    const meta = read !== null && typeof read === "object" ? (read as Record<string, unknown>) : {}
    const aliases = aliasNamesIn(meta.aliases)
    const keywords = new Set<string>()
    for (const token of name.split("-")) keywords.add(token.toLowerCase())
    for (const tag of stringsIn(meta.tags)) keywords.add(tag)
    for (const alias of aliases) keywords.add(alias)
    for (const category of stringsIn(meta.categories)) keywords.add(category)
    entries.push({ name, aliases, keywords: [...keywords].sort() })
  }
  return entries
}

export function rendered(
  entries: readonly Entry[]
): { readonly pages: readonly Staged[] } | { readonly refused: readonly string[] } {
  const indexLines = entries.map((one) => {
    const aliases = one.aliases.map((each) => JSON.stringify(each)).join(", ")
    const keywords = one.keywords.map((each) => JSON.stringify(each)).join(", ")
    return `  { name: ${JSON.stringify(one.name)}, aliases: [${aliases}], keywords: [${keywords}] },`
  })
  const pascalLines = entries.map(
    (one) => `  ${JSON.stringify(kebabToPascal(one.name))}: ${JSON.stringify(one.name)},`
  )

  const tooLong = [
    overlong(indexLines, INDEX_BUDGET, "an ICON_SEARCH_INDEX entry"),
    overlong(pascalLines, PASCAL_BUDGET, "a PASCAL_TO_KEBAB pair"),
  ].filter((one): one is string => one !== null)
  if (tooLong.length > 0) return { refused: tooLong }

  const indexShards = packed(indexLines, INDEX_BUDGET)
  const pascalShards = packed(pascalLines, PASCAL_BUDGET)
  const pages: Staged[] = [
    ...indexShards.map((lines, at) => indexShard(lines, at)),
    ...pascalShards.map((lines, at) => pascalShard(lines, at)),
    aggregate(indexShards.length, pascalShards.length),
  ]

  const past = pages
    .filter((one) => bytesIn(one.code) >= REFUSED_AT_BYTES)
    .map(
      (one) =>
        `${one.codeAt} rendered to ${bytesIn(one.code)} bytes, at or past the ` +
        `${REFUSED_AT_BYTES} byte refusal, so nothing was staged`
    )
  return past.length > 0 ? { refused: past } : { pages }
}

/** The shard slugs standing in the checkout now, whether or not this run keeps them. A
 *  release with fewer icons packs into fewer shards, and the ones no longer reached have
 *  to go rather than sit unimported. */
export function standingIn(root: string): readonly string[] {
  const at = resolve(root, GENERATED_AT)
  if (!existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
    .filter((one) => SHARD_NAME.test(one))
    .sort()
}
