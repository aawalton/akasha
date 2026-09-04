import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { readingIn } from "@akasha/indexes"
import { listedFiled } from "@akasha/indexes/testing"
import { valueAt } from "@akasha/pages-system/page-value"
import { kindsUnder, listedAbove } from "./page-type-descent.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function underIn(root: string, slug: string): ReadonlySet<string> {
  return kindsUnder(slug, readingIn(root), (path) => valueAt(path, root))
}

function aboveIn(root: string): ReadonlyMap<string, readonly string[]> {
  return listedAbove(readingIn(root), (path) => valueAt(path, root))
}

function namedIn(above: string | readonly string[]): string | readonly string[] {
  if (typeof above === "string") return `page-type/${above}`
  return above.map((one) => `page-type/${one}`)
}

function typed(root: string, slug: string, above: string | readonly string[] | null): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  listedFiled(root, "page-type", slug, [{ path, id: `id-${slug}` }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  const said = above === null ? "null" : JSON.stringify(namedIn(above))
  writeFileSync(
    page,
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said} }\n`
  )
}

test("a page type stands under itself", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "domain", null)
  expect(underIn(root, "domain").has("domain")).toBe(true)
})

test("a page type naming a parent stands under it", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  expect(underIn(root, "domain").has("module")).toBe(true)
})

test("descent reaches as deep as the page types go", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  typed(root, "check", "module")
  typed(root, "folder-shape", "check")
  expect([...underIn(root, "domain")].sort()).toEqual(["check", "domain", "folder-shape", "module"])
})

test("a page type standing outside is left out", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "finding", "page")
  expect(underIn(root, "domain").has("finding")).toBe(false)
})

test("a page type naming no parent is read as standing above nothing", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "page", null)
  expect(aboveIn(root).has("page")).toBe(false)
})

test("a page type naming two parents stands under both", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  typed(root, "page-property", "page")
  typed(root, "computed-property", ["module", "page-property"])
  expect(underIn(root, "domain").has("computed-property")).toBe(true)
  expect(underIn(root, "page").has("computed-property")).toBe(true)
})

test("both parents a page type names are read in the order it names them", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "computed-property", ["module", "page-property"])
  expect(aboveIn(root).get("computed-property")).toEqual(["module", "page-property"])
})

test("a page type reaching one parent it names stands under that one", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  typed(root, "computed-property", ["module", "nothing-holds-this"])
  expect(underIn(root, "domain").has("computed-property")).toBe(true)
})
