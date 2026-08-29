import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative } from "node:path"
import { valueIn } from "./index-entries.module.code.ts"
import { indexingAt, rebuiltFrom } from "./indexing.module.code.ts"

type Held = Record<string, unknown>

const A = "01a04a4a-0000-7000-8000-00000000000a"
const B = "01a04a4a-0000-7000-8000-00000000000b"
const C = "01a04a4a-0000-7000-8000-00000000000c"
const D = "01a04a4a-0000-7000-8000-00000000000d"

function bodyOf(value: Held): string {
  return `export const it = ${JSON.stringify(value, null, 2)} as const\n`
}

function treeAt(): string {
  return mkdtempSync(join(tmpdir(), "akasha-index-tree-"))
}

function rootAt(): string {
  return mkdtempSync(join(tmpdir(), "akasha-index-root-"))
}

function clear(...held: readonly string[]): void {
  for (const one of held) rmSync(one, { recursive: true, force: true })
}

function put(tree: string, at: string, value: Held): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, bodyOf(value))
  return path
}

function settled(root: string, tree: string, at: string, value: Held, before: Held | null): string {
  const indexing = indexingAt(root, tree)
  const path = put(tree, at, value)
  indexing.wrote(path, bodyOf(value), before === null ? null : bodyOf(before))
  indexing.settle()
  return path
}

function idFile(root: string, id: string): string {
  return join(root, "identity", "page", "id", `${id}.jsonl`)
}

function slugFile(root: string, pageTypeSlug: string, slug: string): string {
  return join(root, "identity", pageTypeSlug, "slug", `${slug}.jsonl`)
}

function pathFile(root: string, path: string): string {
  return join(root, "identity", "page", "path", `${path}.jsonl`)
}

function edgeFile(root: string, target: string, property: string, source: string): string {
  return join(root, "relation", "page", "id", target, property, `${source}.jsonl`)
}

function schemaFile(root: string, propertySlug: string): string {
  return join(root, "schema", "page-property-type", "slug", `${propertySlug}.jsonl`)
}

function noteOf(rest: Held): Held {
  return { id: "8", pageTypeSlug: "page-property-type", slug: "note", ...rest }
}

const NOTE = noteOf({ kind: "relation", targetPageTypeSlug: "domain" })

const NOTE_AT = "note.page-property-type.ts"

function linesIn(at: string): readonly string[] {
  return readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")
}

function said(at: string): unknown {
  return JSON.parse(linesIn(at)[0] ?? "")
}

const VOCABULARY: readonly (readonly [string, Held])[] = [
  ["page.page-type.ts", { id: "0", pageTypeSlug: "page-type", slug: "page", extendsSlug: null }],
  [
    "page-property-type.page-type.ts",
    { id: "5", pageTypeSlug: "page-type", slug: "page-property-type", extendsSlug: "page" },
  ],
  ["domain.page-type.ts", { id: "1", pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" }],
  ["module.page-type.ts", { id: "2", pageTypeSlug: "page-type", slug: "module", extendsSlug: "domain" }],
  [
    "part-slugs.page-property-type.ts",
    { id: "3", pageTypeSlug: "page-property-type", slug: "part-slugs", kind: "list", entrySlug: "domain-slug" },
  ],
  [
    "domain-slug.page-property-type.ts",
    { id: "4", pageTypeSlug: "page-property-type", slug: "domain-slug", kind: "relation", targetPageTypeSlug: "domain" },
  ],
  ["code.page-property-type.ts", { id: "6", pageTypeSlug: "page-property-type", slug: "code", kind: "file" }],
  ["test.page-property-type.ts", { id: "7", pageTypeSlug: "page-property-type", slug: "test", kind: "file" }],
]

function grounded(): { readonly tree: string; readonly root: string } {
  const tree = treeAt()
  const root = rootAt()
  const indexing = indexingAt(root, tree)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const c = { id: C, pageTypeSlug: "module", slug: "c" }
  for (const [at, value] of [...VOCABULARY, ["b.domain.ts", b], ["c.module.ts", c]] as const) {
    indexing.wrote(put(tree, at, value), bodyOf(value), null)
  }
  indexing.settle()
  return { tree, root }
}

test("a written page is answered by its id, by its page type and slug, and by its own path", () => {
  const tree = treeAt()
  const root = rootAt()
  const at = settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" }, null)
  const found = { path: relative(tree, at), id: A }

  expect(said(idFile(root, A))).toEqual(found)
  expect(said(slugFile(root, "domain", "a"))).toEqual(found)
  expect(said(pathFile(root, "a.domain.ts"))).toEqual(found)
  expect(existsSync(pathFile(root, "a.domain.code.ts"))).toBe(false)
  clear(tree, root)
})

test("a renamed slug withdraws its old entry and leaves the id entry untouched", () => {
  const tree = treeAt()
  const root = rootAt()
  const was = { id: A, pageTypeSlug: "domain", slug: "a" }
  settled(root, tree, "a.domain.ts", was, null)
  settled(root, tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "renamed" }, was)

  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "renamed"))).toBe(true)
  expect(existsSync(idFile(root, A))).toBe(true)
  clear(tree, root)
})

test("a removed page leaves no entry and no empty directory", () => {
  const tree = treeAt()
  const root = rootAt()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const at = settled(root, tree, "a.domain.ts", value, null)
  const indexing = indexingAt(root, tree)
  indexing.took(at, bodyOf(value))
  indexing.settle()

  expect(existsSync(idFile(root, A))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(join(root, "identity", "domain"))).toBe(false)
  clear(tree, root)
})

test("two pages claiming one page type and slug leave two lines in one file", () => {
  const tree = treeAt()
  const root = rootAt()
  settled(root, tree, "one.domain.ts", { id: A, pageTypeSlug: "domain", slug: "same" }, null)
  settled(root, tree, "two.domain.ts", { id: B, pageTypeSlug: "domain", slug: "same" }, null)

  expect(linesIn(slugFile(root, "domain", "same")).length).toBe(2)
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
  const indexing = indexingAt(root, tree)
  indexing.took(at, bodyOf(value))
  indexing.settle()

  expect(existsSync(pathFile(root, "deep/a.module.ts"))).toBe(false)
  expect(existsSync(pathFile(root, "deep/a.module.code.ts"))).toBe(false)
  expect(existsSync(join(root, "identity", "page", "path", "deep"))).toBe(false)
  clear(tree, root)
})

test("two pages falling on one path leave two lines in one file", () => {
  const { tree, root } = grounded()
  settled(root, tree, "x.module.ts", { id: A, pageTypeSlug: "module", slug: "x", code: "ts" }, null)
  settled(root, tree, "x.module.code.ts", { id: B, pageTypeSlug: "code", slug: "x.module" }, null)

  expect(linesIn(pathFile(root, "x.module.code.ts")).length).toBe(2)
  clear(tree, root)
})

test("a property type that changes its kind changes what its entry says", () => {
  const { tree, root } = grounded()
  settled(root, tree, NOTE_AT, NOTE, null)
  expect(said(schemaFile(root, "note"))).toEqual({ kind: "relation", targetPageTypeSlug: "domain", entrySlug: null })

  settled(root, tree, NOTE_AT, noteOf({ kind: "text" }), NOTE)

  expect(said(schemaFile(root, "note"))).toEqual({ kind: "text", targetPageTypeSlug: null, entrySlug: null })
  clear(tree, root)
})

test("a removed property type leaves no schema entry and leaves the rest standing", () => {
  const { tree, root } = grounded()
  const at = settled(root, tree, NOTE_AT, NOTE, null)
  const indexing = indexingAt(root, tree)
  indexing.took(at, bodyOf(NOTE))
  indexing.settle()

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
  indexing.wrote(put(tree, "a.domain.ts", value), bodyOf(value), null)

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
  const tree = treeAt()
  const landed = rootAt()
  const indexing = indexingAt(landed, tree)
  for (const [at, value] of VOCABULARY) indexing.wrote(put(tree, at, value), bodyOf(value), null)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const a = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", partSlugs: ["domain/b"] }
  indexing.wrote(put(tree, "b.domain.ts", b), bodyOf(b), null)
  indexing.wrote(put(tree, "deep/a.module.ts", a), bodyOf(a), null)
  indexing.settle()

  const rebuilt = rootAt()
  rebuiltFrom(tree, rebuilt, tree)

  expect(existsSync(pathFile(landed, "deep/a.module.code.ts"))).toBe(true)
  expect(everyFileUnder(rebuilt)).toEqual(everyFileUnder(landed))
  clear(tree, landed, rebuilt)
})

test("a rebuild takes away an entry no page carries", () => {
  const tree = treeAt()
  const root = rootAt()
  put(tree, "domain.page-type.ts", { id: "1", pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" })
  put(tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" })
  rebuiltFrom(tree, root, tree)

  const stale = slugFile(root, "domain", "gone")
  mkdirSync(dirname(stale), { recursive: true })
  writeFileSync(stale, `${JSON.stringify({ path: "nowhere", id: C })}\n`)
  rebuiltFrom(tree, root, tree)

  expect(existsSync(stale)).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(true)
  clear(tree, root)
})

test("a body that will not load answers with no value rather than throwing", () => {
  expect(valueIn(`import { oidOf } from "./reading.module.code.ts"\nexport const it = { id: oidOf("x") }\n`)).toBe(null)
  expect(valueIn("the new body")).toBe(null)
})

test("a file whose suffix names no page type is passed over without a word", () => {
  const tree = treeAt()
  const root = rootAt()
  const at = put(tree, "held.module.code.ts", { id: A })
  writeFileSync(at, `import { x } from "./nowhere.ts"\nexport const it = { id: x("${A}") }\n`)
  const indexing = indexingAt(root, tree)
  indexing.wrote(at, readFileSync(at, "utf8"), null)

  expect(indexing.settle().length).toBe(0)
  clear(tree, root)
})

test("a page whose body will not load is reported rather than passed over", () => {
  const tree = treeAt()
  const root = rootAt()
  settled(root, tree, "domain.page-type.ts", { id: "1", pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" }, null)

  const at = join(tree, "broken.domain.ts")
  writeFileSync(at, "the new body")
  const indexing = indexingAt(root, tree)
  indexing.wrote(at, "the new body", null)

  const noted = indexing.settle()
  expect(noted.length).toBe(1)
  expect(noted[0] ?? "").toMatch(/did not load/)
  clear(tree, root)
})

test("a path the index stores is relative to the repository root", () => {
  const { tree, root } = grounded()
  settled(root, tree, "deep/a.module.ts", { id: A, pageTypeSlug: "module", slug: "a", code: "ts" }, null)

  const held = everyFileUnder(root).flatMap((one) =>
    one
      .split("\n")
      .filter((line) => line.includes(`"path"`))
      .map((line) => line.slice(line.indexOf("{")))
  )
  expect(held.length).toBeGreaterThan(0)
  for (const line of held) {
    expect((JSON.parse(line) as { path: string }).path.startsWith("/")).toBe(false)
  }
  clear(tree, root)
})
