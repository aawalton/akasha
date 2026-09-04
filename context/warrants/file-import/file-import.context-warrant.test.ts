import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "@akasha/command-system/reading"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing as wrote } from "@akasha/command-system/scratching/testing"
import { importIn } from "@akasha/indexes/import"
import { entriesFiled, importsTakenFrom, pathFiled, schemaFiled } from "@akasha/indexes/testing"
import { mintedId } from "@akasha/testing-system/minting"
import { unreadIn, type Warrant } from "../../modules/warranting/warranting.module.code.ts"
import {
  pathsOf,
  warrantsSeeded,
} from "../../modules/warranting/warranting.module.test-fixtures.ts"
import { fileImport, IMPORTED, importedIn } from "./file-import.context-warrant.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AGENT = "01a04f58-a7ef-7002-942e-14b7c0c71bef"

const PREFIX = "akasha-file-import-"

function paged(root: string, path: string, page: string): undefined {
  pathFiled(root, path, [{ path: page, id: mintedId(page) }])
}

function filed(root: string, path: string, page: string, body: string): string {
  const oid = wrote(root, path, body)
  paged(root, path, page)
  entriesFiled(root, importIn(body, path, root))
  return oid
}

function pageAt(slug: string): string {
  return `akasha/${slug}/${slug}.module.ts`
}

function moduleAt(root: string, slug: string): string {
  const path = pageAt(slug)
  filed(root, path, path, `export const held = { slug: "${slug}" }\n`)
  return path
}

function codeAt(root: string, slug: string, body: string): string {
  const path = `akasha/${slug}/${slug}.module.code.ts`
  filed(root, path, pageAt(slug), body)
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
  filed(root, "akasha/b/b.module.test-fixtures.ts", pageAt("b"), "export const held = 1\n")
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
  filed(root, page, page, 'import { held } from "./s.module.ts"\n')
  expect(pathsOf(warrantsAt(root, page))).toEqual([])
})

test("a page importing its own file warrants nothing, the page being what is changed", () => {
  const root = scratch.rootFor(PREFIX)
  const page = pageAt("s")
  filed(root, page, page, 'import { held } from "./s.module.code.ts"\n')
  filed(root, "akasha/s/s.module.code.ts", page, "export const held = 1\n")
  expect(pathsOf(warrantsAt(root, page))).toEqual([])
})

test("an import index that is not there warrants what the body says all the same", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
  importsTakenFrom(root)
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
})

test("a cold index refuses rather than warranting nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  rmSync(join(root, ".git"), { recursive: true, force: true })
  expect(() => warrantsAt(root, at)).toThrow("is not there")
})

function manifested(root: string, slug: string, named: string): undefined {
  schemaFiled(root, "named-file-property", "manifest", [
    {
      pageTypeSlug: "named-file-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "manifest",
      propertySlug: "manifest",
      fileName: "package.json",
    },
  ])
  filed(
    root,
    `akasha/${slug}/package.json`,
    pageAt(slug),
    JSON.stringify({ name: named, exports: { ".": `./${slug}.module.code.ts` } })
  )
}

test("a file importing a package by name warrants the page the manifest lands it on", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  manifested(root, "b", "@akasha/b")
  const at = codeAt(root, "a", 'import { b } from "@akasha/b"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([pageAt("b")])
})

test("a name no manifest states warrants nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  manifested(root, "b", "@akasha/b")
  const at = codeAt(root, "a", 'import { c } from "@akasha/c"\n')
  expect(pathsOf(warrantsAt(root, at))).toEqual([])
})

test("a specifier naming a package is read as the file the naming handed in lands it on", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  const at = codeAt(root, "a", 'import { b } from "@akasha/b"\n')
  expect(importedIn(root, at)).toEqual([])
  expect(importedIn(root, at, new Map([["@akasha/b", "akasha/b/b.module.code.ts"]]))).toEqual([
    "akasha/b/b.module.code.ts",
  ])
})

test("what a file imports is read from its own body", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a", "b"])
  codeAt(root, "b", "")
  const at = codeAt(root, "a", 'import { b } from "../b/b.module.code.ts"\n')
  importsTakenFrom(root)
  expect(importedIn(root, at)).toEqual(["akasha/b/b.module.code.ts"])
})

test("a file that does not stand imports nothing", () => {
  const root = scratch.rootFor(PREFIX)
  world(root, ["a"])
  expect(importedIn(root, "akasha/gone/gone.module.code.ts")).toEqual([])
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
  warrantsSeeded(root, ["file-import"])
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
