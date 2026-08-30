import { afterAll, expect, test } from "bun:test"
import { appendFileSync, mkdirSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { blobIdOf, recordRead } from "../../../command-system/reading/reading.module.code.ts"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standing as wrote } from "../../../command-system/scratching/scratching.module.test-fixtures.ts"
import { importIn } from "../../../pages-system/indexes/index/index-import/index-import.index.code.ts"
import { mintedId } from "../../../testing-system/minting/minting.module.code.ts"
import { pathsOf } from "../../warrant-scratch/warrant-scratch.module.code.ts"
import { unreadIn, type Warrant } from "../../warranting/warranting.module.code.ts"
import { warrantsStanding } from "../../warranting/warranting.module.test-fixtures.ts"
import { fileImport, IMPORTED, importedIn } from "./file-import.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04f58-a7ef-7002-942e-14b7c0c71bef"

const INDEX_AT = ".git/data/index"

const PREFIX = "akasha-file-import-"

function filed(root: string, at: string, line: string): undefined {
  const to = join(root, INDEX_AT, at)
  mkdirSync(dirname(to), { recursive: true })
  appendFileSync(to, `${line}\n`)
}

function paged(root: string, path: string, page: string): undefined {
  const id = mintedId(page)
  filed(root, join("path", `${path}.jsonl`), JSON.stringify({ path: page, id }))
}

function standing(root: string, path: string, page: string, body: string): string {
  const oid = wrote(root, path, body)
  paged(root, path, page)
  for (const one of importIn(body, path, root)) filed(root, one.at, one.line)
  return oid
}

function pageAt(slug: string): string {
  return `akasha/${slug}/${slug}.module.ts`
}

function moduleAt(root: string, slug: string): string {
  const path = pageAt(slug)
  standing(root, path, path, `export const held = { slug: "${slug}" }\n`)
  return path
}

function codeAt(root: string, slug: string, body: string): string {
  const path = `akasha/${slug}/${slug}.module.code.ts`
  standing(root, path, pageAt(slug), body)
  return path
}

function world(root: string, slugs: readonly string[]): undefined {
  for (const one of slugs) moduleAt(root, one)
}

function warrantsAt(root: string, path: string): readonly Warrant[] {
  return fileImport(root, path)
}

test("a file warrants the page of every file it imports", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b", "c", "d"])
  codeAt(root, "b", "")
  codeAt(root, "d", "")
  const at = codeAt(
    root,
    "a",
    [
      'import { b } from "../b/b.module.code.ts"',
      'import type { C } from "../c/c.module.ts"',
      'import { d } from "../d/d.module.code.ts"',
      "",
    ].join("\n")
  )
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b"), pageAt("c"), pageAt("d")])
})

test("a file imported in turn is not warranted, this warrant being no closure", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b", "c"])
  const two = codeAt(root, "b", 'import { c } from "../c/c.module.code.ts"\n')
  codeAt(root, "c", "")
  const one = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  expect(pathsOf(warrantsAt(root, one))).toEqual([pageAt("b")])
  expect(pathsOf(warrantsAt(root, one))).not.toContain(pageAt("c"))
  expect(pathsOf(warrantsAt(root, two))).toEqual([pageAt("c")])
})

test("an imported code file warrants the page whose property it is, never itself", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  const beside = codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
  expect(pathsOf(warrantsAt(root, at))).not.toContain(beside)
})

test("two files of one page are one warrant, the page being read once", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  standing(root, "akasha/b/b.module.test-fixtures.ts", pageAt("b"), "export const held = 1\n")
  const at = codeAt(
    root,
    "a",
    [
      'import { b } from "../b/b.module.code.ts"',
      'import { held } from "../b/b.module.test-fixtures.ts"',
      "",
    ].join("\n")
  )
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
})

test("a package import warrants nothing, naming no file under the root", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(
    root,
    "a",
    [
      'import { join } from "node:path"',
      'import { expect } from "bun:test"',
      'import { b } from "../b/b.module.code.ts"',
      "",
    ].join("\n")
  )
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
})

test("a file importing packages alone warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a"])
  const at = codeAt(root, "a", 'import { readFileSync } from "node:fs"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a file importing nothing warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a"])
  const at = codeAt(root, "a", "export const one = 1\n")
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a file importing itself warrants nothing, the file changed being no warrant", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a"])
  const page = pageAt("s")
  standing(root, page, page, 'import { held } from "./s.module.ts"\n')
  expect(pathsOf(warrantsAt(root, page))).toEqual([])
})

test("a page importing its own file warrants nothing, the page being what is changed", () => {
  const root = scratch.rootFor(PREFIX)
  const page = pageAt("s")
  standing(root, page, page, 'import { held } from "./s.module.code.ts"\n')
  standing(root, "akasha/s/s.module.code.ts", page, "export const held = 1\n")
  expect(pathsOf(warrantsAt(root, page))).toEqual([])
})

test("an import index that is not there warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
  rmSync(join(root, INDEX_AT, "import"), { recursive: true, force: true })
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a cold index warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  rmSync(join(root, ".git"), { recursive: true, force: true })
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a part file left in the index is no import, only a filed one being read", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b", "c"])
  codeAt(root, "b", "")
  codeAt(root, "c", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  filed(root, "import/path/akasha/c/c.module.code.ts.jsonl.4242.part", JSON.stringify({ path: at }))
  expect(importedIn(root, at)).toEqual(["akasha/b/b.module.code.ts"])
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
})

test("an imported path the index names no page for warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a"])
  const at = codeAt(root, "a", 'import { loose } from "../z/loose.ts"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a page that is not standing warrants nothing of itself", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  rmSync(join(root, pageAt("b")))
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("an import warrants the body standing at the page, and says why it is owed", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  const held = warrantsAt(root, at)[0]
  expect(held?.path).toBe(pageAt("b"))
  expect(held?.oid).toBe(blobIdOf(new TextEncoder().encode('export const held = { slug: "b" }\n')))
  expect(held?.owed).toBe(IMPORTED)
})

test("a page of an import not read is refused, and the refusal says the page is owed", () => {
  const root = scratch.rootFor(PREFIX)
  warrantsStanding(root, ["file-import"])
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  recordRead(root, AGENT, {
    path: at,
    oid: blobIdOf(new TextEncoder().encode('import { b } from "../b/b.module.code.ts"\n')),
    seenAt: 1,
    mechanicalOid: null,
  })
  const said = unreadIn(root, AGENT, [at])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(pageAt("b"))
  expect(said[0]).toContain(IMPORTED)
})
