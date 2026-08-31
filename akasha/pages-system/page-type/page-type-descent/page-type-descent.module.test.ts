import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { standingFiled } from "../../indexes/index-reading/index-reading.module.test-fixtures.ts"
import { kindsUnder, standingAbove } from "./page-type-descent.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function typed(root: string, slug: string, above: string | null): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  standingFiled(root, "page-type", slug, [{ path, id: `id-${slug}` }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  const said = above === null ? "null" : JSON.stringify(`page-type/${above}`)
  writeFileSync(
    page,
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said} }\n`
  )
}

test("a page type stands under itself", () => {
  const root = scratch.rootFor("akasha-descent-")
  expect(kindsUnder(root, "domain").has("domain")).toBe(true)
})

test("a page type naming a parent stands under it", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  expect(kindsUnder(root, "domain").has("module")).toBe(true)
})

test("descent reaches as deep as the page types go", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "module", "domain")
  typed(root, "check", "module")
  typed(root, "folder-shape", "check")
  expect([...kindsUnder(root, "domain")].sort()).toEqual([
    "check",
    "domain",
    "folder-shape",
    "module",
  ])
})

test("a page type standing outside is left out", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "finding", "page")
  expect(kindsUnder(root, "domain").has("finding")).toBe(false)
})

test("a page type naming no parent is read as standing above nothing", () => {
  const root = scratch.rootFor("akasha-descent-")
  typed(root, "page", null)
  expect(standingAbove(root).has("page")).toBe(false)
})
