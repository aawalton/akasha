import { readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { id as idPage } from "@akasha/pages/page/id"
import { valueAt } from "@akasha/pages/page-value"
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
} from "../fixture-world/fixture-world.module.code.ts"
import { readingAt } from "../surface/index-surface.module.code.ts"
import { indexingAt, settlingOver } from "./indexing.module.code.ts"

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

export const schemaFile = (root: string, pageTypeSlug: string, slug: string): string =>
  join(root, `schema/page-property/${pageTypeSlug}/slug/${slug}.jsonl`)

export const importFile = (root: string, path: string): string =>
  join(root, `import/path/${path}.jsonl`)

export const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

export const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

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

export function aWorldDeclaringNoUnique(): Pair {
  const held = { tree: heldAt(), root: heldAt() }
  for (const [at, value] of [
    aType("9", "text-property", ["page-property"]),
    aProperty("8", "note", "text-property"),
  ])
    put(held.tree, at, bodyOf(value))
  return held
}

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
