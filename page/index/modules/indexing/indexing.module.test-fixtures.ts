import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync } from "node:fs"
import { join } from "node:path"
import { everyFileUnder } from "akasha/check/test/fixture/walking/walking.test-fixture.code.ts"
import {
  type Indexing,
  indexingAt,
  refreshedFrom,
} from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { shapesAt } from "akasha/page/index/modules/property-shaping/property-shaping.module.code.ts"
import { listedById } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { settlingOver } from "akasha/page/index/modules/settling/index-settling.module.code.ts"
import { readingAt } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  aProperty,
  aType,
  bodyOf,
  type Held,
  IDENTIFIERS,
  idOf,
  type Named,
  put,
  scratch,
  thePage,
  VOCABULARY,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { referencesAt } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { id as idPage } from "akasha/page/properties/id.text-property.ts"

export const A = idOf("a")
export const B = idOf("b")
export const C = idOf("c")
export const D = idOf("d")

export type Pair = { readonly tree: string; readonly root: string }

const heldAt = (): string => scratch.rootFor("akasha-index-")

export const bare = (): Pair => {
  const tree = heldAt()
  const root = heldAt()
  const indexing = indexingAt(root, tree)
  for (const [at, value] of IDENTIFIERS) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
  indexing.settle()
  return { tree, root }
}

function wroteText(
  root: string,
  tree: string,
  at: string,
  body: string,
  before: string | null
): string {
  const path = put(tree, at, body)
  const indexing = indexingAt(root, tree)
  indexing.wrote(path, body, before)
  indexing.settle()
  return path
}

export function tookAway(root: string, tree: string, at: string, body: string): undefined {
  const indexing = indexingAt(root, tree)
  indexing.took(at, body)
  indexing.settle()
}

export function wrotePages(root: string, tree: string, named: readonly Named[]): readonly string[] {
  const indexing = indexingAt(root, tree)
  for (const [at, value] of named) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
  return indexing.settle()
}

export function renamed(
  root: string,
  tree: string,
  moves: readonly (readonly [string, Named])[]
): readonly string[] {
  const indexing = indexingAt(root, tree)
  for (const [from, [at, value]] of moves) {
    const gone = join(tree, from)
    indexing.took(gone, readFileSync(gone, "utf8"))
    rmSync(gone)
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
  return indexing.settle()
}

export function settled(
  root: string,
  tree: string,
  at: string,
  value: Held,
  before: Held | null
): string {
  return wroteText(root, tree, at, bodyOf(value), before === null ? null : bodyOf(before))
}

export const idFile = (root: string, id: string): string => join(root, `page/id/${id}.jsonl`)

export const slugFile = (root: string, type: string, slug: string): string =>
  join(root, `page-type/${type}/slug/${slug}.jsonl`)

export const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

export const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

export const namesIn = (
  root: string,
  tree: string,
  target: string,
  property: string,
  source: string
): readonly string[] => {
  const listed = listedById(readingAt(root, tree), target)
  if (listed === null) return []
  const at = referencesAt(listed.path)
  if (at === null || !existsSync(join(tree, at))) return []
  return linesIn(join(tree, at)).flatMap((one) => {
    const read = JSON.parse(one) as {
      propertySlug?: string
      id?: string
      path?: string
    }
    const wanted = read.propertySlug === property && read.id === source
    return wanted && typeof read.path === "string" ? [read.path] : []
  })
}

export const shapeFiled = (
  root: string,
  tree: string,
  pageTypeSlug: string,
  slug: string
): unknown => shapesAt(readingAt(root, tree)).get(`${pageTypeSlug}/${slug}`) ?? null

export const noteShaped = (pageTypeSlug: string, targetPageTypeSlug: string | null): unknown => ({
  pageTypeSlug,
  targetPageTypeSlug,
  unique: null,
  uniquePropertySlug: null,
  slug: "note",
  propertySlug: "note",
  fileName: null,
  folderName: null,
})

export const NOTE = aProperty("8", "note", "relation-property", { targetPageType: "domain" })

export function grounded(): Pair {
  const { tree, root } = bare()
  const indexing = indexingAt(root, tree)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const c = { id: C, pageTypeSlug: "module", slug: "c" }
  for (const [at, value] of [...VOCABULARY, ["b.domain.ts", b], ["c.module.ts", c]] as const) {
    const body = bodyOf(value)
    indexing.wrote(put(tree, at, body), body, null)
  }
  indexing.settle()
  return { tree, root }
}

function aWrittenWorld(): Pair {
  const { tree, root } = bare()
  const indexing = indexingAt(root, tree)
  for (const [at, value] of VOCABULARY)
    indexing.wrote(put(tree, at, bodyOf(value)), bodyOf(value), null)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const a = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", partSlugs: ["domain/b"] }
  indexing.wrote(put(tree, "b.domain.ts", bodyOf(b)), bodyOf(b), null)
  indexing.wrote(put(tree, "deep/a.module.ts", bodyOf(a)), bodyOf(a), null)
  const seen = 'import { a } from "./a.module.ts"\n'
  indexing.wrote(put(tree, "deep/a.module.code.ts", seen), seen, null)
  indexing.settle()
  return { tree, root }
}

export type Worlds = {
  readonly landed: string
  readonly rebuilt: string
  readonly tree: string
}

export function worldsApart(): Worlds {
  const { tree, root } = aWrittenWorld()
  const rebuilt = heldAt()
  refreshedFrom(tree, rebuilt, tree)
  return { landed: root, rebuilt, tree }
}

export function aWorldDeclaringNoUnique(): Pair {
  const held = { tree: heldAt(), root: heldAt() }
  for (const [at, value] of [
    aType("9", "text-property", ["page-property"]),
    aProperty("8", "note", "text-property"),
  ])
    put(held.tree, at, bodyOf(value))
  return held
}

export function aWorldWithOnePage(): Pair {
  const { tree, root } = bare()
  put(tree, "domain.page-type.ts", bodyOf(aType("1", "domain", ["page"])[1]))
  put(tree, "a.domain.ts", bodyOf({ id: A, pageTypeSlug: "domain", slug: "a" }))
  return { tree, root }
}

export function aWorldWithAFileGone(): Pair {
  const held = aWorldWithOnePage()
  symlinkSync(join(held.tree, "nowhere.ts"), join(held.tree, "gone.module.code.ts"))
  return held
}

export const A_WITH_CODE: Held = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }

export const NAMES_C_BY_SLUG: Held = {
  id: A,
  pageTypeSlug: "domain",
  slug: "a",
  partSlugs: ["c"],
}

export const NAMES_C_BY_ID: Held = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: [C] }

const BLOCKED_AT = join("deep", "a.module.referenced-by.jsonl")

function blockedInPlace(tree: string): undefined {
  const blocked = join(tree, BLOCKED_AT)
  rmSync(blocked, { recursive: true, force: true })
  mkdirSync(join(blocked, "inside"), { recursive: true })
}

export function pathBlocked(root: string, tree: string): undefined {
  rmSync(root, { recursive: true, force: true })
  blockedInPlace(tree)
}

export function aWorldWithAnEdge(): Pair {
  return { tree: aWrittenWorld().tree, root: heldAt() }
}

function aRefreshedWorld(): Pair {
  const held = aWorldWithAnEdge()
  refreshedFrom(held.tree, held.root, held.tree)
  return held
}

export function aRefreshBlocked(): Pair {
  const held = aRefreshedWorld()
  blockedInPlace(held.tree)
  return held
}

export type FileHeld = {
  readonly indexing: Indexing
  readonly root: string
  readonly ran: string
}

export function aFileHeldNotLoaded(): FileHeld {
  const { tree, root } = grounded()
  const ran = join(tree, "ran")
  const body = writingTo(ran)
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "x.module.code.ts", body), body, null)
  return { indexing, root, ran }
}

export const pathsFiledIn = (root: string): readonly string[] =>
  everyFileUnder(root)
    .flatMap((one) => one.split("\n"))
    .filter((one) => one.includes(`"path"`))
    .map((one) => (JSON.parse(one.slice(one.indexOf("{"))) as { path: string }).path)

export function aWorldDeclaringNothing(): Pair {
  const held = { tree: heldAt(), root: heldAt() }
  put(held.tree, "domain.page-type.ts", bodyOf(aType("1", "domain", ["page"])[1]))
  put(held.tree, "a.domain.ts", bodyOf({ id: A, pageTypeSlug: "domain", slug: "a" }))
  return held
}

function uniqueKindRespelled(unique: string): readonly string[] {
  const { tree, root } = grounded()
  const at = join(tree, "id.text-property.ts")
  const moving = [{ path: at, before: bodyOf(idPage), after: bodyOf({ ...idPage, unique }) }]
  const read = readingAt(root, tree)
  return settlingOver(read, tree, moving, (path) => valueAt(path, tree)).filings.map(
    (one) => one.at
  )
}

export const untouchedAfter = (unique: string): boolean =>
  uniqueKindRespelled(unique).some((one) => one.includes(join("page", "id", B)))

export const aTarget = (slug: string): Named => thePage({ id: D, pageTypeSlug: "domain", slug })

export const aSource = (slug: string, names: string): Named =>
  thePage({ id: A, pageTypeSlug: "domain", slug, partSlugs: [`domain/${names}`] })

const writingTo = (at: string): string =>
  `import { writeFileSync } from "node:fs"\nwriteFileSync("${at}", "x")\nexport const it = { id: "${D}", pageTypeSlug: "domain", slug: "d" }\n`

export function retyped(
  root: string,
  tree: string,
  from: string,
  to: string,
  took: readonly string[]
): readonly string[] {
  const indexing = indexingAt(root, tree)
  const at = join(tree, from)
  const was = readFileSync(at, "utf8")
  indexing.took(at, was)
  rmSync(at)
  const now = was.replaceAll(`"${from.split(".")[0]}"`, `"${to.split(".")[0]}"`)
  indexing.wrote(put(tree, to, now), now, null)
  for (const one of took) {
    const gone = join(tree, one)
    indexing.took(gone, readFileSync(gone, "utf8"))
    rmSync(gone)
  }
  return indexing.settle()
}

export const TYPE_SLUG: Named = aProperty(idOf("e"), "type-slug", "relation-property", {
  targetPageType: "page-type",
})

export const namingAType = (slug: string): Named =>
  thePage({ id: A, pageTypeSlug: "domain", slug: "namer", typeSlug: `page-type/${slug}` })
