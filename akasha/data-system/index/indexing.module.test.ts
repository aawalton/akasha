import { expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
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

function put(tree: string, at: string, value: Held): string {
  const path = join(tree, at)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, bodyOf(value))
  return path
}

function idFile(root: string, id: string): string {
  return join(root, "identity", "page", "id", `${id}.jsonl`)
}

function slugFile(root: string, pageTypeSlug: string, slug: string): string {
  return join(root, "identity", pageTypeSlug, "slug", `${slug}.jsonl`)
}

function edgeFile(root: string, target: string, property: string, source: string): string {
  return join(root, "relation", "page", "id", target, property, `${source}.jsonl`)
}

function linesIn(at: string): readonly string[] {
  return readFileSync(at, "utf8")
    .split("\n")
    .filter((one) => one !== "")
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
]

function grounded(): { readonly tree: string; readonly root: string } {
  const tree = treeAt()
  const root = rootAt()
  const indexing = indexingAt(root)
  for (const [at, value] of VOCABULARY) {
    const path = put(tree, at, value)
    indexing.wrote(path, bodyOf(value), null)
  }
  indexing.wrote(put(tree, "b.domain.ts", { id: B, pageTypeSlug: "domain", slug: "b" }), bodyOf({ id: B, pageTypeSlug: "domain", slug: "b" }), null)
  indexing.wrote(put(tree, "c.module.ts", { id: C, pageTypeSlug: "module", slug: "c" }), bodyOf({ id: C, pageTypeSlug: "module", slug: "c" }), null)
  indexing.settle()
  return { tree, root }
}

test("a written page is answered by its id and by its page type and slug", () => {
  const tree = treeAt()
  const root = rootAt()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const at = put(tree, "a.domain.ts", value)
  const indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(value), null)
  indexing.settle()

  expect(JSON.parse(linesIn(idFile(root, A))[0] ?? "")).toEqual({ path: at, id: A })
  expect(JSON.parse(linesIn(slugFile(root, "domain", "a"))[0] ?? "")).toEqual({ path: at, id: A })
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a renamed slug withdraws its old entry and leaves the id entry untouched", () => {
  const tree = treeAt()
  const root = rootAt()
  const was = { id: A, pageTypeSlug: "domain", slug: "a" }
  const now = { id: A, pageTypeSlug: "domain", slug: "renamed" }
  const at = put(tree, "a.domain.ts", was)
  let indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(was), null)
  indexing.settle()

  writeFileSync(at, bodyOf(now))
  indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(now), bodyOf(was))
  indexing.settle()

  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "renamed"))).toBe(true)
  expect(existsSync(idFile(root, A))).toBe(true)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a removed page leaves no entry and no empty directory", () => {
  const tree = treeAt()
  const root = rootAt()
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const at = put(tree, "a.domain.ts", value)
  let indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(value), null)
  indexing.settle()

  indexing = indexingAt(root)
  indexing.took(at, bodyOf(value))
  indexing.settle()

  expect(existsSync(idFile(root, A))).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(false)
  expect(existsSync(join(root, "identity", "domain"))).toBe(false)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("two pages claiming one page type and slug leave two lines in one file", () => {
  const tree = treeAt()
  const root = rootAt()
  const one = { id: A, pageTypeSlug: "domain", slug: "same" }
  const two = { id: B, pageTypeSlug: "domain", slug: "same" }
  const indexing = indexingAt(root)
  indexing.wrote(put(tree, "one.domain.ts", one), bodyOf(one), null)
  indexing.wrote(put(tree, "two.domain.ts", two), bodyOf(two), null)
  indexing.settle()

  expect(linesIn(slugFile(root, "domain", "same")).length).toBe(2)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a value naming its page type is filed under the target's id", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  const at = put(tree, "a.domain.ts", value)
  const indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(value), null)
  indexing.settle()

  expect(JSON.parse(linesIn(edgeFile(root, B, "part-slugs", A))[0] ?? "")).toEqual({ path: at })
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a bare value reaches a page type extending the one its property names", () => {
  const { tree, root } = grounded()
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["c"] }
  const at = put(tree, "a.domain.ts", value)
  const indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(value), null)
  indexing.settle()

  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a retargeted value withdraws the edge it left", () => {
  const { tree, root } = grounded()
  const was = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  const now = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: [C] }
  const at = put(tree, "a.domain.ts", was)
  let indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(was), null)
  indexing.settle()

  writeFileSync(at, bodyOf(now))
  indexing = indexingAt(root)
  indexing.wrote(at, bodyOf(now), bodyOf(was))
  indexing.settle()

  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
  expect(existsSync(edgeFile(root, C, "part-slugs", A))).toBe(true)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})

test("a bare value narrowing to more than one page is refused rather than resolved", () => {
  const { tree, root } = grounded()
  const clash = { id: D, pageTypeSlug: "module", slug: "b" }
  let indexing = indexingAt(root)
  indexing.wrote(put(tree, "b.module.ts", clash), bodyOf(clash), null)
  indexing.settle()

  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["b"] }
  indexing = indexingAt(root)
  indexing.wrote(put(tree, "a.domain.ts", value), bodyOf(value), null)

  const refused = indexing.settle() as unknown as readonly string[]
  expect(refused.join(" ")).toMatch(/narrows to 2 pages/)
  expect(existsSync(edgeFile(root, B, "part-slugs", A))).toBe(false)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
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
  const indexing = indexingAt(landed)
  for (const [at, value] of VOCABULARY) indexing.wrote(put(tree, at, value), bodyOf(value), null)
  const b = { id: B, pageTypeSlug: "domain", slug: "b" }
  const a = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }
  indexing.wrote(put(tree, "b.domain.ts", b), bodyOf(b), null)
  indexing.wrote(put(tree, "a.domain.ts", a), bodyOf(a), null)
  indexing.settle()

  const rebuilt = rootAt()
  rebuiltFrom(tree, rebuilt)

  expect(everyFileUnder(rebuilt)).toEqual(everyFileUnder(landed))
  rmSync(tree, { recursive: true, force: true })
  rmSync(landed, { recursive: true, force: true })
  rmSync(rebuilt, { recursive: true, force: true })
})

test("a rebuild takes away an entry no page carries", () => {
  const tree = treeAt()
  const root = rootAt()
  const kind = { id: "1", pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" }
  put(tree, "domain.page-type.ts", kind)
  put(tree, "a.domain.ts", { id: A, pageTypeSlug: "domain", slug: "a" })
  rebuiltFrom(tree, root)

  const stale = slugFile(root, "domain", "gone")
  mkdirSync(dirname(stale), { recursive: true })
  writeFileSync(stale, `${JSON.stringify({ path: "nowhere", id: C })}\n`)
  rebuiltFrom(tree, root)

  expect(existsSync(stale)).toBe(false)
  expect(existsSync(slugFile(root, "domain", "a"))).toBe(true)
  rmSync(tree, { recursive: true, force: true })
  rmSync(root, { recursive: true, force: true })
})
