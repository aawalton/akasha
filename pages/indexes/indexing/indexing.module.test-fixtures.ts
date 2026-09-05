import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { id as idPage } from "@akasha/pages-system/page/id"
import { slug as slugPage } from "@akasha/pages-system/page/slug"
import { indexingAt } from "./indexing.module.code.ts"

export type Held = Record<string, unknown>

export const idOf = (one: string): string => `01a04a4a-0000-7000-8000-00000000000${one}`

export const A = idOf("a")
export const B = idOf("b")
export const C = idOf("c")
export const D = idOf("d")

export function bodyOf(value: Held): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

export type Pair = { readonly tree: string; readonly root: string }

export const scratch = scratchWorld()

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

export function put(tree: string, at: string, body: string): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  return path
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
  join(root, `identity/${type}/slug/${slug}.jsonl`)

export const pathFile = (root: string, path: string): string => join(root, `path/${path}.jsonl`)

export const butTheStamp = (found: readonly string[]): readonly string[] =>
  found.filter((one) => !one.startsWith("/stamp.jsonl "))

export const edgeFile = (root: string, target: string, property: string, source: string): string =>
  join(root, `relation/page/id/${target}/${property}/${source}.jsonl`)

export const schemaFile = (root: string, pageTypeSlug: string, slug: string): string =>
  join(root, `schema/page-property/${pageTypeSlug}/slug/${slug}.jsonl`)

export const importFile = (root: string, path: string): string =>
  join(root, `import/path/${path}.jsonl`)

export const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

export const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

export type Named = readonly [string, Held]

export function aType(
  id: string,
  slug: string,
  extendsSlug: readonly string[],
  declares: readonly string[] = []
): Named {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  return [`${slug}.page-type.ts`, { id, pageTypeSlug: "page-type", slug, extendsSlug, properties }]
}

export function aProperty(id: string, slug: string, shape: string, rest: Held = {}): Named {
  return [`${slug}.${shape}.ts`, { id, pageTypeSlug: shape, slug, propertySlug: slug, ...rest }]
}

export function thePage(value: Held): Named {
  return [`${String(value.slug)}.${String(value.pageTypeSlug)}.ts`, value]
}

export const NOTE = aProperty("8", "note", "relation-property", { targetPageTypeSlug: "domain" })

export const IDENTIFIERS: readonly Named[] = [
  aType("0", "page", [], ["id", "slug"]),
  aType("12", "page-type", ["page"]),
  aType("5", "page-property", ["page"]),
  aType("9", "text-property", ["page-property"]),
  aType("10", "relation-property", ["page-property"]),
  aType("1", "domain", ["page"]),
  aType("2", "module", ["domain"], ["code", "test"]),
  thePage(idPage),
  thePage(slugPage),
]

export const VOCABULARY: readonly Named[] = [
  ...IDENTIFIERS,
  aType("11", "file-property", ["page-property"]),
  aProperty("3", "part-slugs", "relation-property", { targetPageTypeSlug: "domain" }),
  aProperty("4", "domain-slug", "relation-property", { targetPageTypeSlug: "domain" }),
  aProperty("6", "code", "file-property"),
  aProperty("7", "test", "file-property"),
]

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
  targetPageTypeSlug: "page-type",
})

export const namingAType = (slug: string): Named =>
  thePage({ id: A, pageTypeSlug: "domain", slug: "namer", typeSlug: `page-type/${slug}` })
