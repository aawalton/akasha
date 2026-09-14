import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { indexIdentity } from "akasha/pages/indexes/identity/index-identity.index.ts"
import { indexImport } from "akasha/pages/indexes/import/index-import.index.ts"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import type { Entry } from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/modules/filing/index-filing.module.code.ts"
import { shapeAlsoFiled } from "akasha/pages/indexes/modules/filing/index-filing.module.test-fixtures.ts"
import { refreshedFrom } from "akasha/pages/indexes/modules/indexing/indexing.module.code.ts"
import { keepBuilt } from "akasha/pages/indexes/modules/keeping/index-keeping.module.code.ts"
import { readingIn } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import type { Reading, Shape } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"
import {
  beneath,
  indexIn,
  overlaidOn,
} from "akasha/pages/indexes/modules/surface/index-surface.module.code.ts"
import { indexPath } from "akasha/pages/indexes/path/index-path.index.ts"
import { indexRelation } from "akasha/pages/indexes/relation/index-relation.index.ts"
import { indexValue } from "akasha/pages/indexes/value/index-value.index.ts"
import type { Value } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/modules/walking/walking.module.code.ts"
import { declaringUnder } from "akasha/testing-system/test-fixtures/declaring/declaring.test-fixture.code.ts"
import { admitting } from "akasha/testing-system/test-fixtures/minting/minting.test-fixture.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const PAGE_PROPERTY = "page-property"

const AT_PATH = "path"

const NOT_JSON = "{ this is not json\n"

function under(root: string, at: string): string {
  return join(indexIn(root), at)
}

function making(root: string, at: string): string {
  const path = under(root, at)
  mkdirSync(dirname(path), { recursive: true })
  keepBuilt(indexIn(root))
  return path
}

function written(root: string, at: string, lines: readonly unknown[]): undefined {
  writeFileSync(making(root, at), lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function filing(root: string, at: string, lines: readonly unknown[]): undefined {
  written(root, `${at}${ENDING}`, lines)
}

function adding(root: string, at: string, lines: readonly unknown[]): undefined {
  const path = making(root, `${at}${ENDING}`)
  appendFileSync(path, lines.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function unreadable(root: string, at: string): undefined {
  writeFileSync(making(root, at), NOT_JSON)
}

function foldering(root: string, at: string): undefined {
  mkdirSync(under(root, at), { recursive: true })
  keepBuilt(indexIn(root))
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
  appendFileSync(making(root, `${join(indexListing.name, AT_PATH)}${ENDING}`), `${path}\n`)
}

export function pathFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  filing(root, join(indexPath.name, path), lines)
  listingAdded(root, path)
}

function pathSaid(line: string): unknown {
  try {
    return (JSON.parse(line) as { path?: unknown }).path
  } catch {
    return undefined
  }
}

export function pagesFilingPath(reading: Reading, path: string): readonly string[] {
  const found: string[] = []
  for (const line of reading.lines(`${join(indexPath.name, path)}${ENDING}`)) {
    const said = pathSaid(line)
    if (typeof said === "string") found.push(said)
  }
  return found
}

export function listingFiled(root: string, paths: readonly string[]): undefined {
  const at = making(root, `${join(indexListing.name, AT_PATH)}${ENDING}`)
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

function typeValued(root: string, kind: string, above: readonly string[]): undefined {
  const at = `akasha/${kind}.${PAGE_TYPE}.ts`
  const id = typeListed(root, kind, at)
  const value = { id, pageTypeSlug: PAGE_TYPE, slug: kind, extends: above }
  valueAlsoFiled(root, PAGE_TYPE, [{ path: at, value }])
}

function kindFiled(root: string, kind: string): undefined {
  if (kind === PAGE_PROPERTY) return
  const held = KINDED.get(root) ?? new Set<string>()
  KINDED.set(root, held)
  if (!held.has(PAGE_PROPERTY)) {
    held.add(PAGE_PROPERTY)
    typeValued(root, PAGE_PROPERTY, [])
  }
  if (held.has(kind)) return
  held.add(kind)
  typeValued(root, kind, [PAGE_PROPERTY])
}

function shaping(pageTypeSlug: string, slug: string): Shape {
  return {
    pageTypeSlug,
    targetPageTypeSlug: null,
    unique: null,
    uniquePropertySlug: null,
    slug,
    propertySlug: slug,
    fileName: null,
    folderName: null,
    sorted: false,
  }
}

export function shapeAdded(
  root: string,
  pageTypeSlug: string,
  slug: string,
  lines: readonly unknown[]
): undefined {
  for (const one of lines) {
    if (one === null || typeof one !== "object") continue
    const said = {
      ...shaping(pageTypeSlug, slug),
      ...one,
    } as Record<string, unknown>
    if (typeof said.propertySlug !== "string") continue
    const kind = typeof said.pageTypeSlug === "string" ? said.pageTypeSlug : pageTypeSlug
    kindFiled(root, kind)
    shapeAlsoFiled(root, kind, [said])
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
  for (const one of entries) appendFileSync(making(root, one.at), `${one.line}\n`)
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

export function identitiesListedIn(root: string, pageTypeSlug: string): boolean {
  return existsSync(under(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug)))
}

export function idTakenFrom(root: string, id: string): undefined {
  taking(root, join(indexIdentity.name, PAGE, ID, `${id}${ENDING}`))
}

export function identitiesTakenFrom(root: string, pageTypeSlug: string): undefined {
  taking(root, join(indexIdentity.name, PAGE_TYPE, pageTypeSlug))
}

export function fileWhereTheIndexIs(root: string, text: string): undefined {
  const at = indexIn(root)
  rmSync(at, { recursive: true, force: true })
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
}

const TREE = "akasha"

const IMPORTS_NONE = "akasha/one/imports-none.module.ts"

function moduleTyped(root: string): undefined {
  const at = `${TREE}/module.page-type.ts`
  const id = "01a04bed-1450-7000-8000-0000000000ff"
  listedFiled(root, "page-type", "module", [{ path: at, id }])
}

function pagesRebuilt(root: string): string {
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
