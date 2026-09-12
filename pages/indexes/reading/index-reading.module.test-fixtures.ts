import {
  appendFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { said as git } from "akasha/git/running/git-running.module.code.ts"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import { refreshedFrom } from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import { indexPath } from "akasha/pages/indexes/path/index-path.index.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import {
  beneath,
  indexIn,
  overlaidOn,
} from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { declaringUnder } from "akasha/testing-system/declaring/declaring.module.code.ts"
import { admitting } from "akasha/testing-system/minting/minting.module.code.ts"
import { HELD } from "akasha/testing-system/page-holding/page-holding.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const PAGE_PROPERTY = "page-property"

const AT_PATH = "path"

const PART = ".4242.part"

const NOT_JSON = "{ this is not json\n"

function under(root: string, at: string): string {
  return join(indexIn(root), at)
}

function written(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = under(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function filing(root: string, at: string, lines: readonly unknown[]): undefined {
  written(root, `${at}${ENDING}`, lines)
}

function adding(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = under(root, `${at}${ENDING}`)
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function unreadable(root: string, at: string): undefined {
  const path = under(root, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, NOT_JSON)
}

function foldering(root: string, at: string): undefined {
  mkdirSync(under(root, at), { recursive: true })
}

function taking(root: string, at: string): undefined {
  rmSync(under(root, at), { recursive: true, force: true })
}

function identityFiled(
  root: string,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexIdentity.name, uniqueKind, scope, propertySlug, said), lines)
}

function identityListed(
  root: string,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string
): boolean {
  const at = join(indexIdentity.name, uniqueKind, scope, propertySlug, `${said}${ENDING}`)
  return existsSync(under(root, at))
}

export function scopedFiled(
  root: string,
  pageTypeSlug: string,
  scopePropertySlug: string,
  scopeValue: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  const scope = join(pageTypeSlug, scopePropertySlug, scopeValue)
  identityFiled(root, PAGE_PROPERTY, scope, SLUG, slug, lines)
}

export function listedAlsoFiled(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  adding(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG, slug), lines)
}

export function listedAndValued(
  root: string,
  pageTypeSlug: string,
  slug: string,
  path: string,
  id: string
): undefined {
  listedFiled(root, pageTypeSlug, slug, [{ path, id }])
  valueAlsoFiled(root, pageTypeSlug, [{ path, value: { id, pageTypeSlug, slug } }])
}

export function listedFiledIn(root: string, pageTypeSlug: string, slug: string): boolean {
  return identityListed(root, PAGE_TYPE, pageTypeSlug, SLUG, slug)
}

const MINTED_FROM = 20

export function pageFilingFrom(
  root: string,
  stem: string
): (pageTypeSlug: string, slug: string, path: string, value: Value) => string {
  let held = MINTED_FROM
  return (pageTypeSlug, slug, path, value) => {
    const id = `${stem}${held}`
    held += 1
    listedFiled(root, pageTypeSlug, slug, [{ path, id }])
    idFiled(root, id, [{ path, id }])
    valueAlsoFiled(root, pageTypeSlug, [{ path, value: { id, ...value } }])
    return id
  }
}

export function listedUnreadableFiled(root: string, pageTypeSlug: string, slug: string): undefined {
  unreadable(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

export function pageFiled(root: string, id: string, path: string): undefined {
  idFiled(root, id, [{ path, id }])
}

export function idFiledIn(root: string, id: string): boolean {
  return identityListed(root, PAGE, NO_SCOPE, ID, id)
}

function listingAdded(root: string, path: string): undefined {
  const at = under(root, `${join(indexListing.name, AT_PATH)}${ENDING}`)
  mkdirSync(dirname(at), { recursive: true })
  appendFileSync(at, `${path}\n`)
}

export function pathFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  filing(root, join(indexPath.name, path), lines)
  listingAdded(root, path)
}

export function listingFiled(root: string, paths: readonly string[]): undefined {
  const at = under(root, `${join(indexListing.name, AT_PATH)}${ENDING}`)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, paths.map((one) => `${one}\n`).join(""))
}

const KINDED = new Map<string, Set<string>>()

export function typeListed(root: string, slug: string, path?: string): string {
  const id = `01a04bed-2222-7000-8000-${slug}`
  const at = path ?? `akasha/${slug}.${PAGE_TYPE}.ts`
  listedFiled(root, PAGE_TYPE, slug, [{ path: at, id }])
  idFiled(root, id, [{ path: at, id }])
  return id
}

function kindFiled(root: string, kind: string): undefined {
  if (kind === PAGE_PROPERTY) return
  const held = KINDED.get(root) ?? new Set<string>()
  KINDED.set(root, held)
  if (held.has(kind)) return
  held.add(kind)
  relationFiled(root, typeListed(root, PAGE_PROPERTY), "extends-type", typeListed(root, kind), [
    { path: `akasha/${kind}.${PAGE_TYPE}.ts` },
  ])
}

const CARRIED: readonly (readonly [string, string])[] = [
  ["pageTypeSlug", "pageTypeSlug"],
  ["slug", "slug"],
  ["propertySlug", "propertySlug"],
  ["targetPageTypeSlug", "targetPageType"],
  ["unique", "unique"],
  ["uniquePropertySlug", "uniqueProperty"],
  ["fileName", "fileName"],
  ["folderName", "folderName"],
  ["sorted", "sorted"],
]

function shapeSaid(said: Record<string, unknown>): Record<string, unknown> {
  const value: Record<string, unknown> = {}
  for (const [held, key] of CARRIED) {
    const one = said[held]
    if (one !== undefined && one !== null) value[key] = one
  }
  return value
}

export function shapeAdded(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  for (const one of lines) {
    if (one === null || typeof one !== "object") continue
    const said = { pageTypeSlug, slug, propertySlug: slug, ...one } as Record<string, unknown>
    const kind = typeof said.pageTypeSlug === "string" ? said.pageTypeSlug : pageTypeSlug
    const named = typeof said.slug === "string" ? said.slug : slug
    kindFiled(root, kind)
    valueAlsoFiled(root, kind, [{ path: `akasha/${named}.${kind}.ts`, value: shapeSaid(said) }])
  }
}

export function relationFiled(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexRelation.name, PAGE, ID, id, propertySlug, from), lines)
}

export function importFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  filing(root, join(indexImport.name, AT_PATH, path), lines)
}

export function importUnreadableFiled(root: string, path: string): undefined {
  unreadable(root, join(indexImport.name, AT_PATH, `${path}${ENDING}`))
}

export function importPartLeft(root: string, path: string, lines: readonly unknown[]): undefined {
  written(root, join(indexImport.name, AT_PATH, `${path}${ENDING}${PART}`), lines)
}

export function nothingFiled(root: string): undefined {
  foldering(root, "")
}

export function noneOfTypeFiled(root: string, pageTypeSlug: string): undefined {
  foldering(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG))
}

export function noPathsFiled(root: string): undefined {
  foldering(root, indexPath.name)
}

export function noImportersFiled(root: string): undefined {
  foldering(root, join(indexImport.name, AT_PATH))
}

export function entriesFiled(root: string, entries: readonly Entry[]): undefined {
  for (const one of entries) {
    const path = under(root, one.at)
    mkdirSync(dirname(path), { recursive: true })
    appendFileSync(path, `${one.line}\n`)
  }
}

export function linesFiled(root: string, at: string, lines: readonly unknown[]): undefined {
  written(root, at, lines)
}

export function readingLaidOver(
  root: string,
  said: Readonly<Record<string, readonly unknown[]>>
): Reading {
  const reading = readingIn(root)
  const filings = Object.entries(said).map(([at, lines]) => ({
    at,
    came: lines.map((one) => (typeof one === "string" ? one : JSON.stringify(one))),
    went: reading.lines(at),
  }))
  return overlaidOn(reading, filings)
}

export function everythingFiled(root: string): readonly string[] {
  return everyFileUnder(indexIn(root))
}

export function everythingRead(reading: Reading): Record<string, unknown> {
  const said: Record<string, unknown> = {}
  const walk = (at: string): undefined => {
    const listing = [...reading.listing(at)].sort((one, two) =>
      one.name < two.name ? -1 : one.name > two.name ? 1 : 0
    )
    said[`${at}/`] = listing.map((one) => `${one.name}${one.directory ? "/" : ""}`)
    for (const one of listing) {
      const next = beneath(at, one.name)
      said[`${next}?`] = reading.holds(next)
      if (one.directory) walk(next)
      else said[next] = reading.lines(next)
    }
  }
  walk("")
  return said
}

export function indexTakenFrom(root: string): undefined {
  rmSync(indexIn(root), { recursive: true, force: true })
}

export function refreshedIn(
  root: string,
  tree: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  return refreshedFrom(join(root, tree), indexIn(root), root)
}

export function refreshedApart(root: string, tree: string, aside: string): readonly string[] {
  refreshedFrom(join(root, tree), aside, root)
  return everyFileUnder(aside)
}

export function identitiesCopied(from: string, into: string, pageTypeSlug: string): undefined {
  const at = join(indexIdentity.name, PAGE_TYPE, pageTypeSlug)
  cpSync(under(from, at), under(into, at), { recursive: true })
}

export function idCopied(from: string, into: string, id: string): undefined {
  const at = join(indexIdentity.name, PAGE, ID, `${id}${ENDING}`)
  mkdirSync(dirname(under(into, at)), { recursive: true })
  cpSync(under(from, at), under(into, at))
}

export function listedTakenFrom(root: string, pageTypeSlug: string, slug: string): undefined {
  taking(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

function slugSaid(line: string): unknown {
  try {
    return (JSON.parse(line) as { value?: { slug?: unknown } }).value?.slug
  } catch {
    return undefined
  }
}

export function valueTakenFrom(root: string, pageTypeSlug: string, slug: string): undefined {
  const at = under(root, `${join(indexValue.name, pageTypeSlug)}${ENDING}`)
  if (!existsSync(at)) return
  const kept = readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "" && slugSaid(one) !== slug)
  writeFileSync(at, kept.map((one) => `${one}\n`).join(""))
}

export function importsListed(root: string): boolean {
  return existsSync(under(root, indexImport.name))
}

export function identitiesListedIn(root: string, pageTypeSlug: string): boolean {
  return existsSync(under(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug)))
}

export function idTakenFrom(root: string, id: string): undefined {
  taking(root, join(indexIdentity.name, PAGE, ID, `${id}${ENDING}`))
}

export function identitiesTakenFrom(root: string, pageTypeSlug: string): undefined {
  taking(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug))
}

export function pathsTakenFrom(root: string): undefined {
  taking(root, indexPath.name)
}

export function importsTakenFrom(root: string): undefined {
  taking(root, indexImport.name)
}

export function fileWhereTheIndexIs(root: string, text: string): undefined {
  const at = indexIn(root)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
}

const TREE = "akasha"

const IMPORTS_NONE = "akasha/one/imports-none.module.ts"

export const HELD_PAGE = `export const held = {
  id: "01a04bed-1450-7000-8000-00000000aaaa",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page carried across a move",
}
`

export function moduleTyped(root: string): undefined {
  const at = `${TREE}/module.page-type.ts`
  const id = "01a04bed-1450-7000-8000-0000000000ff"
  listedFiled(root, "page-type", "module", [{ path: at, id }])
}

export function pagesRebuilt(root: string): string {
  refreshedIn(root, TREE)
  moduleTyped(root)
  importFiled(root, IMPORTS_NONE, [])
  admitting(root)
  return root
}

export function repoAt(root: string, named: Readonly<Record<string, string>>): string {
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries({ ...declaringUnder(TREE), ...named })) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(
    join(root, ".git/info/exclude"),
    "akasha/*.code-check.ts\nakasha/*.code-check.code.ts\n*.uncommitted.ts\n*.uncommitted.jsonl\n"
  )
  return pagesRebuilt(root)
}

export function heldIndexedAt(root: string): string {
  return pagesRebuilt(repoAt(root, { [HELD]: HELD_PAGE }))
}
