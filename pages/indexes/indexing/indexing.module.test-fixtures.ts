import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { said as git } from "@akasha/git/git-running"
import { id as idPage } from "@akasha/pages/page/id"
import { slug as slugPage } from "@akasha/pages/page/slug"
import { declaringUnder } from "@akasha/testing-system/declaring"
import { indexingAt, rebuiltWhole } from "./indexing.module.code.ts"

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

const TREE = "akasha"

export const HELD_PAGE = `${TREE}/one/held.module.ts`

export const HELD_CODE = `${TREE}/one/held.module.code.ts`

export const NAMER_PAGE = `${TREE}/two/namer.module.ts`

export const NAMER_CODE = `${TREE}/two/namer.module.code.ts`

export const HELD_EXPORT = "kept"

const HELD_BODY = `export const ${HELD_EXPORT} = 1\n`

const NAMER_BODY = `import { ${HELD_EXPORT} } from "../one/held.module.code.ts"

export const named = ${HELD_EXPORT} + 1
`

const REPO_VOCABULARY: readonly Named[] = [
  aType(idOf("1"), "page", [], ["id", "slug"]),
  aType(idOf("2"), "page-type", ["page-type/page"]),
  aType(idOf("3"), "page-property", ["page-type/page"]),
  aType(idOf("4"), "file-property", ["page-type/page-property"]),
  aType(idOf("5"), "domain", ["page-type/page"]),
  aType(idOf("6"), "module", ["page-type/domain"], ["code"]),
  aProperty(idOf("7"), "code", "file-property"),
]

const modulePage = (slug: string, id: string): Held => ({
  id,
  pageTypeSlug: "module",
  slug,
  definition: "a page an indexed repository carries",
  code: "ts",
})

const REPO: Readonly<Record<string, string>> = {
  ...Object.fromEntries(REPO_VOCABULARY.map(([at, value]) => [`${TREE}/${at}`, bodyOf(value)])),
  [HELD_PAGE]: bodyOf(modulePage("held", idOf("8"))),
  [NAMER_PAGE]: bodyOf(modulePage("namer", idOf("9"))),
  [HELD_CODE]: HELD_BODY,
  [NAMER_CODE]: NAMER_BODY,
}

export function indexedRepo(named: Readonly<Record<string, string>> = {}): string {
  const root = scratch.rootFor("akasha-indexed-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [at, body] of Object.entries({ ...declaringUnder(TREE), ...REPO, ...named })) {
    put(root, at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  rebuiltWhole(root, join(root, TREE), true)
  return root
}

export function textIn(root: string): (path: string) => string | null {
  return (path) => {
    try {
      return readFileSync(join(root, path), "utf8")
    } catch {
      return null
    }
  }
}
