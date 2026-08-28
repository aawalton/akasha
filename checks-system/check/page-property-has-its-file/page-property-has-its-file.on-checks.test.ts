import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import type { CheckFailure, Tree } from "../check-shape.ts"
import pagePropertyHasItsFile from "./page-property-has-its-file.check.code.attachment.ts"

const MODULE = `export const held = { slug: "module", pageTypeSlug: "page-type" }\n`

const PROPERTY_TYPE = `export const held = { slug: "page-property-type", pageTypeSlug: "page-type" }\n`

const CODE = `export const held = { slug: "code", pageTypeSlug: "page-property-type", kind: "file" }\n`

const DEFINITION = `export const held = { slug: "definition", pageTypeSlug: "page-property-type", kind: "text" }\n`

const HOLDS = `export const x = 1\n`

const AT = "akasha/write-system/corpus.module.ts"

const BESIDE = "akasha/write-system/corpus.module.code.ts"

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
  const root = mkdtempSync(join(tmpdir(), "page-property-has-its-file-"))
  const held: Record<string, string> = {
    "akasha/module.page-type.ts": MODULE,
    "akasha/page-property-type.page-type.ts": PROPERTY_TYPE,
    "akasha/code.page-property-type.ts": CODE,
    "akasha/definition.page-property-type.ts": DEFINITION,
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
  const said = pagePropertyHasItsFile.run({ root, paths: [], tree: treeOver(root), keep: () => root })
  return said.map((one) => ({ path: relative(root, one.path), reason: one.reason }))
}

function page(stated: string): string {
  return `export const corpus = { slug: "corpus", pageTypeSlug: "module", ${stated} }\n`
}

test("a page whose property file stands and holds something passes", () => {
  expect(verdict({ [AT]: page(`code: "ts"`), [BESIDE]: HOLDS })).toEqual([])
})

test("a page whose property file is not there fails, and the reason names it", () => {
  const said = verdict({ [AT]: page(`code: "ts"`) })
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`corpus` states `code` as `ts`")
  expect(said[0]?.reason).toContain(`nothing stands at \`${BESIDE}\``)
})

test("a page whose property file is empty fails, and the reason reads differently", () => {
  const said = verdict({ [AT]: page(`code: "ts"`), [BESIDE]: "" })
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain(`\`${BESIDE}\` is empty`)
  expect(said[0]?.reason).not.toContain("nothing stands at")
})

test("the failure is reported against the page, never the file it looked for", () => {
  const said = verdict({ [AT]: page(`code: "ts"`) })
  expect(said[0]?.path).toBe(AT)
})

test("a page stating no property of kind file passes", () => {
  expect(verdict({ [AT]: page(`definition: "the pages as they stand"`) })).toEqual([])
})

test("a property of a kind other than file is not judged", () => {
  const said = verdict({ [AT]: page(`code: "ts", definition: "held"`), [BESIDE]: HOLDS })
  expect(said).toEqual([])
})

test("a property stated as anything but text is outside this check", () => {
  expect(verdict({ [AT]: page(`code: 7`) })).toEqual([])
  expect(verdict({ [AT]: page(`code: ""`) })).toEqual([])
})

test("the file looked for carries the extension the page states", () => {
  const said = verdict({ [AT]: page(`code: "md"`), [BESIDE]: HOLDS })
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha/write-system/corpus.module.code.md")
})

test("every page carrying a property of kind file is judged", () => {
  const other = "akasha/write-system/landing.module.ts"
  const said = verdict({
    [AT]: page(`code: "ts"`),
    [other]: `export const landing = { slug: "landing", pageTypeSlug: "module", code: "ts" }\n`,
  })
  expect(said).toHaveLength(2)
  expect(said.map((one) => one.path).sort()).toEqual([AT, other].sort())
})
