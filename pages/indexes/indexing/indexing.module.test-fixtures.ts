import { mkdirSync, readFileSync, rmSync, symlinkSync } from "node:fs"
import { join } from "node:path"
import { typed as typedCode } from "akasha/code/typing/code-typing.module.code.ts"
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
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import { indexingAt, refreshedFrom } from "akasha/pages/indexes/indexing/indexing.module.code.ts"
import { shapesAt } from "akasha/pages/indexes/property-shaping/property-shaping.module.code.ts"
import { everyPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { pathsRead, readerAt, ruleWhole } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import { settlingOver } from "akasha/pages/indexes/settling/index-settling.module.code.ts"
import { readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { id as idPage } from "akasha/pages/properties/id.text-property.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { everyFileUnder } from "akasha/testing-system/walking/walking.module.code.ts"

export const A = idOf("a")
export const B = idOf("b")
export const C = idOf("c")
export const D = idOf("d")

export type Pair = { readonly tree: string; readonly root: string }

export const heldAt = (): string => scratch.rootFor("akasha-index-")

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

export function wroteText(
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

export const idFile = (root: string, id: string): string =>
  join(root, `identity/page/id/${id}.jsonl`)

export const slugFile = (root: string, type: string, slug: string): string =>
  join(root, `identity/page-type/${type}/slug/${slug}.jsonl`)

export const pathFile = (root: string, path: string): string => join(root, `path/${path}.jsonl`)

export const edgeFile = (root: string, target: string, property: string, source: string): string =>
  join(root, `relation/page/id/${target}/${property}/${source}.jsonl`)

export const importFile = (root: string, path: string): string =>
  join(root, `import/path/${path}.jsonl`)

export const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

export const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

export const shapeFiled = (root: string, pageTypeSlug: string, slug: string): unknown =>
  shapesAt(readingAt(root)).get(`${pageTypeSlug}/${slug}`) ?? null

export const noteShaped = (pageTypeSlug: string, targetPageTypeSlug: string | null): unknown => ({
  pageTypeSlug,
  targetPageTypeSlug,
  unique: null,
  uniquePropertySlug: null,
  slug: "note",
  propertySlug: "note",
  fileName: null,
  folderName: null,
  sorted: false,
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

export function aWrittenWorld(): Pair {
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

export type Stamps = {
  readonly rebuilt: readonly string[]
  readonly landed: readonly string[]
}

export type Worlds = { readonly landed: string; readonly rebuilt: string }

export function worldsApart(): Worlds {
  const { tree, root } = aWrittenWorld()
  const rebuilt = heldAt()
  refreshedFrom(tree, rebuilt, tree)
  return { landed: root, rebuilt }
}

export function unreadAfterRebuild(): readonly string[] {
  const { rebuilt } = worldsApart()
  const reading = readingAt(rebuilt)
  const read = pathsRead(reading)
  return everyPath(reading).filter((one) => typedCode(one) && !read.has(one))
}

export function wholeAfterRebuild(): boolean {
  const reading = readingAt(worldsApart().rebuilt)
  return ruleWhole(reading, everyPath(reading))
}

export function stampsApart(): Stamps {
  const { landed, rebuilt } = worldsApart()
  const stamped = (at: string): readonly string[] =>
    everyFileUnder(at).filter((one) => one.startsWith(`/${readerAt()} `))
  return { rebuilt: stamped(rebuilt), landed: stamped(landed) }
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

export function pathBlocked(root: string, at: string): undefined {
  const blocked = pathFile(root, at)
  rmSync(root, { recursive: true, force: true })
  mkdirSync(join(blocked, "inside"), { recursive: true })
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

export function uniqueKindRespelled(unique: string): readonly string[] {
  const { tree, root } = grounded()
  const at = join(tree, "id.text-property.ts")
  const moving = [{ path: at, before: bodyOf(idPage), after: bodyOf({ ...idPage, unique }) }]
  return settlingOver(readingAt(root), tree, moving, (path) => valueAt(path, tree)).filings.map(
    (one) => one.at
  )
}

export const untouchedAfter = (unique: string): boolean =>
  uniqueKindRespelled(unique).some((one) => one.includes(join("identity", "page", "id", B)))

export const aTarget = (slug: string): Named => thePage({ id: D, pageTypeSlug: "domain", slug })

export const aSource = (slug: string, names: string): Named =>
  thePage({ id: A, pageTypeSlug: "domain", slug, partSlugs: [`domain/${names}`] })

export const writingTo = (at: string): string =>
  `import { writeFileSync } from "node:fs"\nwriteFileSync("${at}", "x")\nexport const it = { id: "${D}", pageTypeSlug: "domain", slug: "d" }\n`

export const BLAND = aType(D, "bland", ["domain"], [])

export const BLAND_CODE = aType(D, "bland", ["domain"], ["code"])

export function blandWith(declares: Named): Pair {
  const { tree, root } = grounded()
  wrotePages(root, tree, [declares])
  put(tree, "one.bland.code.ts", "export const one = 1\n")
  wrotePages(root, tree, [thePage({ id: A, pageTypeSlug: "bland", slug: "one", code: "ts" })])
  return { tree, root }
}

export const IMPORTS = 'import { b } from "./b.ts"\nimport type { C } from "../c.ts"\n'

export const IMPORTS_AT = "d/a.module.code.ts"

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
