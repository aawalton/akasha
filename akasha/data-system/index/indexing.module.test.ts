import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative } from "node:path"
import { indexingAt, rebuiltFrom } from "./indexing.module.code.ts"

type Held = Record<string, unknown>

const idOf = (one: string): string => `01a04a4a-0000-7000-8000-00000000000${one}`

const A = idOf("a")
const B = idOf("b")
const C = idOf("c")
const D = idOf("d")

function bodyOf(value: Held): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

type Pair = { readonly tree: string; readonly root: string }

const heldAt = (): string => mkdtempSync(join(tmpdir(), "akasha-index-"))

const bare = (): Pair => ({ tree: heldAt(), root: heldAt() })

const clear = (...held: readonly string[]): void => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
}

function put(tree: string, at: string, body: string): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
  return path
}

function wroteText(root: string, tree: string, at: string, body: string, before: string | null): string {
  const path = put(tree, at, body)
  const indexing = indexingAt(root, tree)
  indexing.wrote(path, body, before)
  indexing.settle()
  return path
}

function tookAway(root: string, tree: string, at: string, body: string): void {
  const indexing = indexingAt(root, tree)
  indexing.took(at, body)
  indexing.settle()
}

function settled(root: string, tree: string, at: string, value: Held, before: Held | null): string {
  return wroteText(root, tree, at, bodyOf(value), before === null ? null : bodyOf(before))
}

const idFile = (root: string, id: string): string => join(root, `identity/page/id/${id}.jsonl`)

const slugFile = (root: string, type: string, slug: string): string =>
  join(root, `identity/${type}/slug/${slug}.jsonl`)

const pathFile = (root: string, path: string): string =>
  join(root, `identity/page/path/${path}.jsonl`)

const edgeFile = (root: string, target: string, property: string, source: string): string =>
  join(root, `relation/page/id/${target}/${property}/${source}.jsonl`)

const schemaFile = (root: string, slug: string): string =>
  join(root, `schema/page-property-type/slug/${slug}.jsonl`)

const importFile = (root: string, path: string): string => join(root, `import/path/${path}.jsonl`)

const linesIn = (at: string): readonly string[] =>
  readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")

const said = (at: string): unknown => JSON.parse(linesIn(at)[0] ?? "")

type Named = readonly [string, Held]

function aType(id: string, slug: string, extendsSlug: string | null): Named {
  return [`${slug}.page-type.ts`, { id, pageTypeSlug: "page-type", slug, extendsSlug }]
}

function aProperty(id: string, slug: string, rest: Held): Named {
  return [`${slug}.page-property-type.ts`, { id, pageTypeSlug: "page-property-type", slug, ...rest }]
}

const NOTE = aProperty("8", "note", { kind: "relation", targetPageTypeSlug: "domain" })

const VOCABULARY: readonly Named[] = [
  aType("0", "page", null),
  aType("5", "page-property-type", "page"),
  aType("1", "domain", "page"),
  aType("2", "module", "domain"),
  aProperty("3", "part-slugs", { kind: "list", entrySlug: "domain-slug" }),
  aProperty("4", "domain-slug", { kind: "relation", targetPageTypeSlug: "domain" }),
  aProperty("6", "code", { kind: "file" }),
  aProperty("7", "test", { kind: "file" }),
]

function grounded(): Pair {
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

test("a written page is answered by its id, by its page type and slug, and by its own path", () => {
  const { tree, root } = bare()
  const at = settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" }, null)
  const found = { path: relative(tree, at), id: A }

  expect(said(idFile(root, A))).toEqual(found)
  expect(said(slugFile(root, "domain", "a"))).toEqual(found)
  expect(said(pathFile(root, "a.domain.ts"))).toEqual(found)
  expect(existsSync(pathFile(root, "a.domain.code.ts"))).toBe(false)
  clear(tree, root)
})

test("a renamed slug withdraws its old entry and leaves the id entry untouched", () => {
  const { tree, root } = bare()
  const was = { id: A, pageTypeSlug: "domain", slug: "a" }
  settled(root, tree, "a.domain.ts", was, null)
  settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "renamed" }, was)

  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "renamed"))).toBe(true)
  expect(existsSync(idFile(root, A))).toBe(true)
  clear(tree, root)
})

test("a removed page leaves no entry and no empty directory", () => {
  const { tree, root } = bare()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const at = settled(root, tree, "a.domain.ts", value, null)
  tookAway(root, tree, at, bodyOf(value))

  expect(existsSync(idFile(root, A))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(join(root, "identity", "domain"))).toBe(false)
  clear(tree, root)
})

test("a property held in a file is answered by the page stating it", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  settled(root, tree, "deep/a.module.ts", value, null)
  const found = { path: "deep/a.module.ts", id: A }

  expect(said(pathFile(root, "deep/a.module.ts"))).toEqual(found)
  expect(said(pathFile(root, "deep/a.module.code.ts"))).toEqual(found)
  expect(said(pathFile(root, "deep/a.module.test.ts"))).toEqual(found)
  clear(tree, root)
})

test("a page whose code is taken away loses that path and keeps the rest", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  settled(root, tree, "a.module.ts", was, null)
  expect(existsSync(pathFile(root, "a.module.code.ts"))).toBe(true)

  settled(root, tree, "a.module.ts", { id: A, pageTypeSlug: "module", slug: "a", test: "ts" }, was)

  expect(existsSync(pathFile(root, "a.module.code.ts"))).toBe(false)
  expect(existsSync(pathFile(root, "a.module.test.ts"))).toBe(true)
  expect(existsSync(pathFile(root, "a.module.ts"))).toBe(true)
  clear(tree, root)
})

test("a removed page takes away the path of its own file and of every file it held", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }
  const at = settled(root, tree, "deep/a.module.ts", value, null)
  tookAway(root, tree, at, bodyOf(value))

  expect(existsSync(pathFile(root, "deep/a.module.ts"))).toBe(false)
  expect(existsSync(pathFile(root, "deep/a.module.code.ts"))).toBe(false)
  expect(existsSync(join(root, "identity", "page", "path", "deep"))).toBe(false)
  clear(tree, root)
})

test("two pages carrying one value leave two lines in one file", () => {
  const { tree, root } = grounded()
  settled(root, tree, "one.domain.ts", { id: A, pageTypeSlug: "domain", slug: "same" }, null)
  settled(root, tree, "two.domain.ts", { id: B, pageTypeSlug: "domain", slug: "same" }, null)

  expect(linesIn(slugFile(root, "domain", "same")).length).toBe(2)
  clear(tree, root)
})

test("a property type that changes its kind changes what its entry says", () => {
  const { tree, root } = grounded()
  settled(root, tree, ...NOTE, null)
  expect(said(schemaFile(root, "note"))).toEqual({ kind: "relation", targetPageTypeSlug: "domain", entrySlug: null })

  settled(root, tree, NOTE[0], aProperty("8", "note", { kind: "text" })[1], NOTE[1])

  expect(said(schemaFile(root, "note"))).toEqual({ kind: "text", targetPageTypeSlug: null, entrySlug: null })
  clear(tree, root)
})

test("a removed property type leaves no schema entry and leaves the rest standing", () => {
  const { tree, root } = grounded()
  const at = settled(root, tree, ...NOTE, null)
  tookAway(root, tree, at, bodyOf(NOTE[1]))

  expect(existsSync(schemaFile(root, "note"))).toBe(false)
  expect(existsSync(schemaFile(root, "part-slugs"))).toBe(true)
  clear(tree, root)
})

test("a value naming its page type is filed under the target's id", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  const at = settled(root, tree, "a.domain.ts", value, null)

  expect(said(edgeFile(root, B, "part-slugs", A))).toEqual({ path: relative(tree, at) })
  clear(tree, root)
})

test("a bare value reaches a page type extending the one its property names", () => {
  const { tree, root } = grounded()
  settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["c"] }, null)

  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
  clear(tree, root)
})

test("a retargeted value withdraws the edge it left", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  settled(root, tree, "a.domain.ts", was, null)
  settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: [C] }, was)

  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
  clear(tree, root)
})

test("a bare value narrowing to more than one page is refused rather than resolved", () => {
  const { tree, root } = grounded()
  settled(root, tree, "b.module.ts", { id: D, pageTypeSlug: "module", slug: "b" }, null)
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["b"] }
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "a.domain.ts", bodyOf(value)), bodyOf(value), null)

  expect(indexing.settle().join(" ")).toMatch(/narrows to 2 pages/)
  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
  clear(tree, root)
})

function everyFileUnder(at: string): readonly string[] {
  const found: string[] = []
  const walk = (here: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else found.push(`${next.slice(at.length)} ${readFileSync(next, "utf8")}`)
    }
  }
  walk(at)
  return found.sort()
}

test("a rebuild from the pages agrees with the index a write left", () => {
  const { tree, root: landed } = bare()
  const indexing = indexingAt(landed, tree)
  for (const [at, value] of VOCABULARY) indexing.wrote(put(tree, at, bodyOf(value)), bodyOf(value), null)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const a = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", partSlugs: ["domain/b"] }
  indexing.wrote(put(tree, "b.domain.ts", bodyOf(b)), bodyOf(b), null)
  indexing.wrote(put(tree, "deep/a.module.ts", bodyOf(a)), bodyOf(a), null)
  const seen = 'import { a } from "./a.module.ts"\n'
  indexing.wrote(put(tree, "deep/a.module.code.ts", seen), seen, null)
  indexing.settle()
  expect(existsSync(importFile(landed, "deep/a.module.ts"))).toBe(true)

  const rebuilt = heldAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(pathFile(landed, "deep/a.module.code.ts"))).toBe(true)
  expect(everyFileUnder(rebuilt)).toEqual(everyFileUnder(landed))
  clear(tree, landed, rebuilt)
})

test("a rebuild takes away an entry no page carries", () => {
  const { tree, root } = bare()
  put(tree, "domain.page-type.ts", bodyOf(aType("1", "domain", "page")[1]))
  put(tree, "a.domain.ts", bodyOf({ id: A, pageTypeSlug: "domain", slug: "a" }))
  rebuiltFrom(tree, root, tree)

  const stale = slugFile(root, "domain", "gone")
  mkdirSync(dirname(stale), { recursive: true })
  writeFileSync(stale, `${JSON.stringify({ path: "nowhere", id: C })}\n`)
  rebuiltFrom(tree, root, tree)

  expect(existsSync(stale)).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(true)
  clear(tree, root)
})

const IMPORTS = 'import { b } from "./b.ts"\nimport type { C } from "../c.ts"\n'

const IMPORTS_AT = "d/a.module.code.ts"

test("a body that drops an import loses that edge and keeps the one it kept", () => {
  const { tree, root } = bare()
  wroteText(root, tree, IMPORTS_AT, IMPORTS, null)
  wroteText(root, tree, IMPORTS_AT, 'import { b } from "./b.ts"\n', IMPORTS)

  expect(existsSync(importFile(root, "c.ts"))).toBe(false)
  expect(linesIn(importFile(root, "d/b.ts"))).toEqual([`{"path":"${IMPORTS_AT}"}`])
  clear(tree, root)
})

test("a file taken away leaves none of the edges it left", () => {
  const { tree, root } = bare()
  const at = wroteText(root, tree, IMPORTS_AT, IMPORTS, null)
  expect(existsSync(importFile(root, "c.ts"))).toBe(true)

  tookAway(root, tree, at, IMPORTS)

  expect(existsSync(join(root, "import"))).toBe(false)
  clear(tree, root)
})

test("a file a page property holds is not loaded, so it is neither run nor read as a page", () => {
  const { tree, root } = grounded()
  const ran = join(tree, "ran")
  const body = `import { writeFileSync } from "node:fs"\nwriteFileSync("${ran}", "x")\nexport const it = { id: "${D}", pageTypeSlug: "domain", slug: "d" }\n`
  const indexing = indexingAt(root, tree)
  indexing.wrote(put(tree, "x.module.code.ts", body), body, null)

  expect(indexing.settle()).toEqual([])
  expect(existsSync(ran)).toBe(false)
  expect(existsSync(idFile(root, D))).toBe(false)
  clear(tree, root)
})

test("a page whose body will not load is reported rather than passed over", () => {
  const { tree, root } = bare()
  settled(root, tree, ...aType("1", "domain", "page"), null)

  const indexing = indexingAt(root, tree)
  indexing.wrote(join(tree, "broken.domain.ts"), "the new body", null)

  const noted = indexing.settle()
  expect(noted.length).toBe(1)
  expect(noted[0] ?? "").toMatch(/did not load/)
  clear(tree, root)
})

test("a path the index stores is relative to the repository root", () => {
  const { tree, root } = grounded()
  settled(root, tree, "deep/a.module.ts", { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }, null)

  const held = everyFileUnder(root)
    .flatMap((one) => one.split("\n"))
    .filter((one) => one.includes(`"path"`))
    .map((one) => one.slice(one.indexOf("{")))
  expect(held.length).toBeGreaterThan(0)
  for (const line of held) {
    expect((JSON.parse(line) as { path: string }).path.startsWith("/")).toBe(false)
  }
  clear(tree, root)
})
