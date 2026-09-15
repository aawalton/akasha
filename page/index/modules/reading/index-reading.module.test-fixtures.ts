import { appendFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { declaringUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import { admitting } from "akasha/check/test/fixture/minting/minting.test-fixture.code.ts"
import { everyFileUnder } from "akasha/check/test/fixture/walking/walking.test-fixture.code.ts"
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  idFiled,
  listedFiled,
  shapeAlsoFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import { refreshedFrom } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { claimantIn } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  listedById,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading, Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  beneath,
  indexIn,
  overlaidOn,
} from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  fileNameOf,
  IMPORT,
  type Reference,
  referencesAt,
  referencesEach,
} from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { bodyOf } from "akasha/page/modules/referencing/page-referencing.module.test-fixtures.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ENDING = ".jsonl"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const NO_SCOPE = ""

const ID = "id"

const SLUG = "slug"

const PAGE_PROPERTY = "page-property"

const EXTENDS_TYPE = "extends-type"

const NOT_JSON = "{ this is not json\n"

function under(root: string, at: string): string {
  return join(indexIn(root), at)
}

function making(root: string, at: string): string {
  const path = under(root, at)
  mkdirSync(dirname(path), { recursive: true })
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
  filing(root, join(uniqueKind, scope, propertySlug, said), lines)
}

function identityListed(
  root: string,
  uniqueKind: string,
  scope: string,
  propertySlug: string,
  said: string
): boolean {
  const at = join(uniqueKind, scope, propertySlug, `${said}${ENDING}`)
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
  adding(root, join(PAGE_TYPE, pageTypeSlug, SLUG, slug), lines)
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
  unreadable(root, join(PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

export function pageFiled(root: string, id: string, path: string): undefined {
  idFiled(root, id, [{ path, id }])
}

export function idFiledIn(root: string, id: string): boolean {
  return identityListed(root, PAGE, NO_SCOPE, ID, id)
}

const KINDED = new Map<string, Set<string>>()

function typeIdOf(slug: string): string {
  return `01a04bed-2222-7000-8000-${slug}`
}

export function typeListed(root: string, slug: string, path?: string): string {
  const id = typeIdOf(slug)
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
  for (const one of above) relationFiled(root, typeIdOf(one), EXTENDS_TYPE, id, [{ path: at }])
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

export function besideAdded(
  root: string,
  page: string,
  references: readonly Reference[]
): undefined {
  if (references.length === 0) return
  const at = referencesAt(page)
  if (at === null) return
  const beside = join(root, at)
  mkdirSync(dirname(beside), { recursive: true })
  const was = textThere(beside)
  const held = was === null ? [] : referencesEach(was.split("\n").filter((one) => one !== ""))
  writeFileSync(beside, bodyOf([...held, ...references]))
}

function pathedIn(
  lines: readonly unknown[]
): readonly { readonly path: string; readonly id: string | null }[] {
  const found: { readonly path: string; readonly id: string | null }[] = []
  for (const one of lines) {
    if (one === null || typeof one !== "object") continue
    const said = one as { readonly path?: unknown; readonly id?: unknown }
    if (typeof said.path !== "string") continue
    found.push({ path: said.path, id: typeof said.id === "string" ? said.id : null })
  }
  return found
}

export function relationFiled(
  root: string,
  id: string,
  propertySlug: string,
  from: string,
  lines: readonly unknown[]
): undefined {
  const named = listedById(readingIn(root), id)
  if (named === null) return
  besideAdded(
    root,
    named.path,
    pathedIn(lines).map((one) => ({ propertySlug, fileName: null, path: one.path, id: from }))
  )
}

export function importFiled(root: string, path: string, lines: readonly unknown[]): undefined {
  const owner = claimantIn(root, path)
  if (owner === null) return
  besideAdded(
    root,
    owner,
    pathedIn(lines).map((one) => ({
      propertySlug: IMPORT,
      fileName: fileNameOf(path),
      path: one.path,
      id: null,
    }))
  )
}

export function nothingFiled(root: string): undefined {
  foldering(root, "")
}

export function noneOfTypeFiled(root: string, pageTypeSlug: string): undefined {
  foldering(root, join(PAGE_TYPE, pageTypeSlug, SLUG))
}

export function linesFiled(root: string, at: string, lines: readonly unknown[]): undefined {
  written(root, at, lines)
}

export function readingLaidOver(
  root: string,
  said: Readonly<Record<string, readonly unknown[]>>,
  wrote: Readonly<Record<string, string | null>> = {}
): Reading {
  const reading = readingIn(root)
  const filings = Object.entries(said).map(([at, lines]) => ({
    at,
    came: lines.map((one) => (typeof one === "string" ? one : JSON.stringify(one))),
    went: reading.lines(at),
  }))
  return overlaidOn(reading, filings, new Map(Object.entries(wrote)))
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
  taking(root, join(PAGE_TYPE, pageTypeSlug, SLUG, `${slug}${ENDING}`))
}

export function identitiesListedIn(root: string, pageTypeSlug: string): boolean {
  return existsSync(under(root, join(PAGE_TYPE, pageTypeSlug)))
}

export function idTakenFrom(root: string, id: string): undefined {
  taking(root, join(PAGE, ID, `${id}${ENDING}`))
}

export function identitiesTakenFrom(root: string, pageTypeSlug: string): undefined {
  taking(root, join(PAGE_TYPE, pageTypeSlug))
}

export function fileWhereTheIndexIs(root: string, text: string): undefined {
  const at = indexIn(root)
  rmSync(at, { recursive: true, force: true })
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
}

const TREE = "akasha"

function moduleTyped(root: string): undefined {
  const at = `${TREE}/module.page-type.ts`
  const id = "01a04bed-1450-7000-8000-0000000000ff"
  listedFiled(root, "page-type", "module", [{ path: at, id }])
}

function pagesRebuilt(root: string): string {
  refreshedIn(root, TREE)
  moduleTyped(root)
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
    "akasha/*.check-code.ts\nakasha/*.check-code.code.ts\n*.uncommitted.ts\n*.uncommitted.jsonl\n"
  )
  return pagesRebuilt(root)
}
