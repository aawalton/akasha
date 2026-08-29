import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import type { CheckFailure, Tree } from "../check-shape.ts"
import akashaFileHasItsPage from "./akasha-file-has-its-page.check.code.attachment.ts"

const MODULE = `export const held = { slug: "module", pageTypeSlug: "page-type" }\n`

const PROPERTY_TYPE = `export const held = { slug: "page-property-type", pageTypeSlug: "page-type" }\n`

const CODE = `export const held = { slug: "code", pageTypeSlug: "page-property-type", kind: "file" }\n`

const HOLDS = `export const x = 1\n`

function filesIn(at: string): readonly string[] {
  const found: string[] = []
  for (const entry of readdirSync(at, { withFileTypes: true })) {
    const here = `${at}/${entry.name}`
    if (entry.isDirectory()) found.push(...filesIn(here))
    else found.push(here)
  }
  return found
}

function treeOver(root: string): Tree {
  const paths = filesIn(root)
  return {
    root,
    at: (path) => (paths.includes(path) ? readFileSync(path) : null),
    paths: () => paths,
    gone: () => [],
    goneElsewhere: () => [],
    repointedElsewhere: () => new Map(),
    dir: () => root,
  }
}

function corpusOf(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-file-has-its-page-"))
  const held: Record<string, string> = {
    "akasha/module.page-type.ts": MODULE,
    "akasha/page-property-type.page-type.ts": PROPERTY_TYPE,
    "akasha/code.page-property-type.ts": CODE,
    ...files,
  }
  for (const [at, body] of Object.entries(held)) {
    const to = resolve(root, at)
    mkdirSync(dirname(to), { recursive: true })
    writeFileSync(to, body)
  }
  return root
}

function verdict(files: Record<string, string>): readonly CheckFailure[] {
  const root = corpusOf(files)
  const said = akashaFileHasItsPage.run({ root, paths: [], tree: treeOver(root), keep: () => root })
  return said.map((one) => ({ path: relative(root, one.path), reason: one.reason }))
}

function page(stated: string): string {
  return `export const corpus = { slug: "corpus", pageTypeSlug: "module", ${stated} }\n`
}

test("a corpus of nothing but pages is wholly claimed", () => {
  expect(verdict({})).toEqual([])
})

test("a page's own file is claimed by being a page", () => {
  expect(verdict({ "akasha/write-system/corpus.module.ts": page("") })).toEqual([])
})

test("a property file its page states is claimed", () => {
  const said = verdict({
    "akasha/write-system/corpus.module.ts": page(`code: "ts"`),
    "akasha/write-system/corpus.module.code.ts": HOLDS,
  })
  expect(said).toEqual([])
})

test("a property file its page does not state is claimed by nothing", () => {
  const said = verdict({
    "akasha/write-system/corpus.module.ts": page(""),
    "akasha/write-system/corpus.module.code.ts": HOLDS,
  })
  expect(said.map((one) => one.path)).toEqual(["akasha/write-system/corpus.module.code.ts"])
})

test("a property file whose page is not there is claimed by nothing", () => {
  const said = verdict({ "akasha/write-system/corpus.module.code.ts": HOLDS })
  expect(said.map((one) => one.path)).toEqual(["akasha/write-system/corpus.module.code.ts"])
})

test("a file naming a page type nothing declares is claimed by nothing", () => {
  const said = verdict({ "akasha/write-system/corpus.widget.ts": HOLDS })
  expect(said.map((one) => one.path)).toEqual(["akasha/write-system/corpus.widget.ts"])
})

test("a file of neither shape is claimed by nothing", () => {
  const said = verdict({ "akasha/write-system/notes.txt": "loose\n" })
  expect(said.map((one) => one.path)).toEqual(["akasha/write-system/notes.txt"])
})

test("a file outside the akasha folder is outside this check", () => {
  expect(verdict({ "tools/loose.ts": HOLDS })).toEqual([])
})

test("the reason names both shapes a file may take", () => {
  const said = verdict({ "akasha/write-system/notes.txt": "loose\n" })
  const reason = said[0]?.reason ?? ""
  expect(reason).toContain("no page claims this file")
  expect(reason).toContain("its slug and its page type")
  expect(reason).toContain("for its page and for the property it holds")
})
