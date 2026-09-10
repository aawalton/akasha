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
import { declaringUnder } from "akasha/testing-system/declaring/declaring.module.code.ts"
import { admitting } from "akasha/testing-system/minting/minting.module.code.ts"
import { HELD } from "akasha/testing-system/page-holding/page-holding.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"
import { said as git } from "../../../git/git-running/git-running.module.code.ts"
import { DECLARING_AT } from "../declaring/index-declaring.index.code.ts"
import type { Entry } from "../entries/index-entries.module.code.ts"
import { indexIdentity } from "../identity/index-identity.index.ts"
import { indexImport } from "../import/index-import.index.ts"
import { rebuiltFrom } from "../indexing/indexing.module.code.ts"
import { indexListing } from "../listing/index-listing.index.ts"
import { indexPath } from "../path/index-path.index.ts"
import { indexRelation } from "../relation/index-relation.index.ts"
import { indexSchema } from "../schema/index-schema.index.ts"
import type { Reading } from "../shape/index-shape.module.code.ts"
import { beneath, indexIn, overlaidOn } from "../surface/index-surface.module.code.ts"
import { indexValue } from "../value/index-value.index.ts"
import { readingIn } from "./index-reading.module.code.ts"

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

export function listedFiled(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  identityFiled(root, PAGE_TYPE, pageTypeSlug, SLUG, slug, lines)
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

export function valueAlsoFiled(
  root: string,
  pageTypeSlug: string,
  lines: readonly unknown[]
): undefined {
  adding(root, join(indexValue.name, pageTypeSlug), lines)
}

export function listedFiledIn(root: string, pageTypeSlug: string, slug: string): boolean {
  return identityListed(root, PAGE_TYPE, pageTypeSlug, SLUG, slug)
}

export function listedUnreadableFiled(root: string, pageTypeSlug: string, slug: string): undefined {
  unreadable(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

export function idFiled(root: string, id: string, lines: readonly unknown[]): undefined {
  identityFiled(root, PAGE, NO_SCOPE, ID, id, lines)
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

function declaringAdded(root: string, lines: readonly unknown[]): undefined {
  const at = under(root, DECLARING_AT)
  mkdirSync(dirname(at), { recursive: true })
  appendFileSync(at, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

export function schemaFiled(
  root: string,
  pageTypeSlug: string,
  propertySlug: string,
  lines: readonly unknown[]
): undefined {
  filing(root, join(indexSchema.name, PAGE_PROPERTY, pageTypeSlug, SLUG, propertySlug), lines)
  declaringAdded(root, lines)
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
  const filings = Object.entries(said).map(([at, lines]) => ({
    at,
    lines: lines.map((one) => (typeof one === "string" ? one : JSON.stringify(one))),
  }))
  return overlaidOn(readingIn(root), filings)
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

export function rebuiltIn(
  root: string,
  tree: string
): { readonly pages: number; readonly entries: number; readonly refused: readonly string[] } {
  return rebuiltFrom(join(root, tree), indexIn(root), root)
}

export function rebuiltApart(root: string, tree: string, aside: string): readonly string[] {
  rebuiltFrom(join(root, tree), aside, root)
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
  rebuiltIn(root, TREE)
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
