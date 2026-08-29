import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching.module.code.ts"
import { id as idPage } from "../../page/properties/id.text-property.ts"
import { slug as slugPage } from "../../page/properties/slug.text-property.ts"
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

export function tookAway(root: string, tree: string, at: string, body: string): void {
  const indexing = indexingAt(root, tree)
  indexing.took(at, body)
  indexing.settle()
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

export const edgeFile = (root: string, target: string, property: string, source: string): string =>
  join(root, `relation/page/id/${target}/${property}/${source}.jsonl`)

export const schemaFile = (root: string, slug: string): string =>
  join(root, `schema/page-property/slug/${slug}.jsonl`)

export const importFile = (root: string, path: string): string =>
  join(root, `import/path/${path}.jsonl`)

export const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

export const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

export type Named = readonly [string, Held]

export function aType(id: string, slug: string, extendsSlug: string | null): Named {
  return [`${slug}.page-type.ts`, { id, pageTypeSlug: "page-type", slug, extendsSlug }]
}

export function aProperty(id: string, slug: string, shape: string, rest: Held = {}): Named {
  return [`${slug}.${shape}.ts`, { id, pageTypeSlug: shape, slug, ...rest }]
}

export function thePage(value: Held): Named {
  return [`${String(value.slug)}.${String(value.pageTypeSlug)}.ts`, value]
}

export const NOTE = aProperty("8", "note", "relation-property", { targetPageTypeSlug: "domain" })

export const IDENTIFIERS: readonly Named[] = [
  aType("9", "text-property", "page-property"),
  thePage(idPage),
  thePage(slugPage),
]

export const VOCABULARY: readonly Named[] = [
  aType("0", "page", null),
  aType("5", "page-property", "page"),
  ...IDENTIFIERS,
  aType("10", "relation-property", "page-property"),
  aType("11", "file-property", "page-property"),
  aType("1", "domain", "page"),
  aType("2", "module", "domain"),
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
