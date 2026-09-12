import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  idFiled,
  listedFiled,
  namedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { kindsUnder } from "akasha/pages/types/descent/page-type-descent.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function underIn(root: string, slug: string): ReadonlySet<string> {
  return kindsUnder(slug, readingIn(root))
}

function idOf(slug: string): string {
  return `id-${slug}`
}

function typed(root: string, slug: string, above: readonly string[] | null): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  const id = idOf(slug)
  listedFiled(root, "page-type", slug, [{ path, id }])
  idFiled(root, id, [{ path, id }])
  valueAlsoFiled(root, "page-type", [
    { path, value: { id, pageTypeSlug: "page-type", slug, extends: above ?? [] } },
  ])
  for (const one of above ?? []) namedFiled(root, idOf(one), "extends-type", id, [{ path }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  writeFileSync(page, `export const held = { slug: ${JSON.stringify(slug)} }\n`)
}

test("a page type is under itself", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  expect(underIn(root, "domain").has("domain")).toBe(true)
})

test("a page type naming a parent is under it", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  typed(root, "module", ["domain"])
  expect(underIn(root, "domain").has("module")).toBe(true)
})

test("descent reaches as deep as the page types go", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  typed(root, "module", ["domain"])
  typed(root, "check", ["module"])
  typed(root, "folder-shape", ["check"])
  expect([...underIn(root, "domain")].sort()).toEqual(["check", "domain", "folder-shape", "module"])
})

test("a page type outside the one asked for is left out", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  typed(root, "page", null)
  typed(root, "finding", ["page"])
  expect(underIn(root, "domain").has("finding")).toBe(false)
})

test("every page type filed is under `page`", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "page", null)
  typed(root, "domain", null)
  typed(root, "finding", ["page"])
  expect([...underIn(root, "page")].sort()).toEqual(["domain", "finding", "page"])
})

test("a page type naming two parents is under both", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "page", null)
  typed(root, "domain", null)
  typed(root, "module", ["domain"])
  typed(root, "page-property", ["page"])
  typed(root, "computed-property", ["module", "page-property"])
  expect(underIn(root, "domain").has("computed-property")).toBe(true)
  expect(underIn(root, "page-property").has("computed-property")).toBe(true)
})

test("a page type reaching one parent it names is under that one", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  typed(root, "module", ["domain"])
  typed(root, "computed-property", ["module", "nothing-holds-this"])
  expect(underIn(root, "domain").has("computed-property")).toBe(true)
})
