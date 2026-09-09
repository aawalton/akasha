import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import {
  listedFiled,
  pageFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import { carriedFor, computedInto, gatheredFor, kindsFor } from "./kinds-gathering.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

type Declaring = { readonly pagePropertySlug: string; readonly required: boolean }

function filed(
  root: string,
  pageTypeSlug: string,
  slug: string,
  value: Readonly<Record<string, unknown>>
): string {
  const path = `held/${slug}.${pageTypeSlug}.ts`
  const id = `id-${pageTypeSlug}-${slug}`
  listedFiled(root, pageTypeSlug, slug, [{ path, id }])
  pageFiled(root, id, path)
  valueAlsoFiled(root, pageTypeSlug, [{ path, value: { id, pageTypeSlug, slug, ...value } }])
  return path
}

function typed(
  root: string,
  slug: string,
  above: readonly string[],
  properties: readonly Declaring[]
): undefined {
  filed(root, "page-type", slug, {
    extends: above.map((one) => `page-type/${one}`),
    properties,
  })
}

function propertied(
  root: string,
  sort: string,
  slug: string,
  value: Readonly<Record<string, unknown>>
): string {
  const path = filed(root, sort, slug, { propertySlug: slug, ...value })
  schemaFiled(root, sort, slug, [
    {
      pageTypeSlug: sort,
      targetPageTypeSlug: null,
      unique: null,
      slug,
      propertySlug: slug,
      fileName: null,
    },
  ])
  return path
}

function calculated(root: string, slug: string, holds: string, body: string): undefined {
  const at = propertied(root, "computed-property", slug, { holds, code: "ts" })
  const beside = join(root, at.replace(/\.ts$/, ".code.ts"))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, `${body}\n`)
}

function worlded(root: string): undefined {
  propertied(root, "number-property", "count", { max: null })
  calculated(root, "twice", "number", "export function work(page) { return (page.count ?? 0) * 2 }")
  calculated(
    root,
    "thrice",
    "number",
    "export function work(page) { return (page.count ?? 0) * 3 }"
  )
  typed(root, "held", [], [{ pagePropertySlug: "number-property/count", required: false }])
  typed(
    root,
    "nearer",
    ["held"],
    [{ pagePropertySlug: "computed-property/twice", required: false }]
  )
  typed(
    root,
    "further",
    ["nearer"],
    [{ pagePropertySlug: "computed-property/thrice", required: false }]
  )
}

function rowsOf(root: string, pageTypeSlug: string): readonly Record<string, unknown>[] {
  const counted = computedInto(
    root,
    gatheredFor(root, pageTypeSlug, carriedFor(root, pageTypeSlug))
  )
  return counted.rows.map((one) => one.value)
}

test("a page type is gathered together with every page type under it", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  expect(kindsFor(root, "held")).toEqual(["further", "held", "nearer"])
  filed(root, "held", "one", { count: 1 })
  filed(root, "nearer", "two", { count: 2 })
  filed(root, "further", "three", { count: 3 })
  expect(
    rowsOf(root, "held")
      .map((one) => one["slug"])
      .sort()
  ).toEqual(["one", "three", "two"])
})

test("a calculation a page type under the one named declares is worked out on that type's rows", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  filed(root, "held", "one", { count: 1 })
  filed(root, "nearer", "two", { count: 2 })
  filed(root, "further", "three", { count: 3 })
  const said = new Map(rowsOf(root, "held").map((one) => [one["slug"], one]))
  expect(said.get("one")?.["twice"]).toBeUndefined()
  expect(said.get("two")?.["twice"]).toBe(4)
  expect(said.get("three")?.["twice"]).toBe(6)
  expect(said.get("three")?.["thrice"]).toBe(9)
  expect(said.get("two")?.["thrice"]).toBeUndefined()
})

test("a row carries the page type its own page states", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  filed(root, "held", "one", { count: 1 })
  filed(root, "further", "three", { count: 3 })
  expect(rowsOf(root, "held").map((one) => one["pageTypeSlug"])).toEqual(["further", "held"])
})

test("two page types under one carrying one slug are two rows", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  filed(root, "nearer", "same", { count: 2 })
  filed(root, "further", "same", { count: 3 })
  const said = rowsOf(root, "held")
  expect(said.length).toBe(2)
  expect(said.map((one) => one["twice"])).toEqual([6, 4])
})

test("a page type under the one named that no page is filed under is passed over", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  filed(root, "held", "one", { count: 1 })
  expect(gatheredFor(root, "held", carriedFor(root, "held")).length).toBe(1)
})

test("a calculation is read from the page type that row is of", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  calculated(
    root,
    "doubled",
    "number",
    "export function work(page) { return (page.count ?? 0) * 2 }"
  )
  typed(
    root,
    "counted",
    ["held"],
    [{ pagePropertySlug: "computed-property/doubled", required: false }]
  )
  filed(root, "held", "one", { count: 1 })
  filed(root, "counted", "two", { count: 2 })
  const said = new Map(rowsOf(root, "held").map((one) => [one["slug"], one]))
  expect(said.get("two")?.["doubled"]).toBe(4)
  expect(said.get("one")?.["doubled"]).toBeUndefined()
})

test("a property whose code file is not there darkens that property's key alone", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  propertied(root, "computed-property", "missing", { holds: "number", code: "ts" })
  typed(
    root,
    "lacking",
    ["held"],
    [{ pagePropertySlug: "computed-property/missing", required: false }]
  )
  filed(root, "lacking", "two", { count: 2 })
  const counted = computedInto(root, gatheredFor(root, "held", carriedFor(root, "held")))
  expect(counted.dark.get("missing")).toContain("names no code file beside its page")
  expect(counted.rows[0]?.value["slug"]).toBe("two")
})

test("a calculation reaches a page of another page type by its page type and its slug", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  propertied(root, "number-property", "weight", { max: null })
  typed(root, "lifter", [], [{ pagePropertySlug: "number-property/weight", required: false }])
  calculated(
    root,
    "loaded",
    "number",
    'export function work(page, reach) { const one = reach.target("lifter/alan"); return one === null ? null : one.weight * (page.count ?? 0) }'
  )
  typed(
    root,
    "lifted",
    ["held"],
    [{ pagePropertySlug: "computed-property/loaded", required: false }]
  )
  filed(root, "lifter", "alan", { weight: 180 })
  filed(root, "lifted", "one", { count: 2 })
  const said = new Map(rowsOf(root, "held").map((one) => [one["slug"], one]))
  expect(said.get("one")?.["loaded"]).toBe(360)
})

test("a calculation sums over every page naming the page being worked out", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  propertied(root, "relation-property", "under-slug", { targetPageTypeSlug: "page-type/whole" })
  typed(root, "part", [], [{ pagePropertySlug: "relation-property/under-slug", required: false }])
  calculated(
    root,
    "summed",
    "number",
    'export function work(page, reach) { let sum = 0; for (const one of reach.naming("under-slug")) sum += one.count ?? 0; return sum }'
  )
  typed(
    root,
    "whole",
    ["held"],
    [{ pagePropertySlug: "computed-property/summed", required: false }]
  )
  filed(root, "whole", "top", {})
  filed(root, "part", "one", { count: 3, underSlug: "top" })
  filed(root, "part", "two", { count: 4, underSlug: "top" })
  relationFiled(root, "id-whole-top", "under-slug", "id-part-one", [{ path: "held/one.part.ts" }])
  relationFiled(root, "id-whole-top", "under-slug", "id-part-two", [{ path: "held/two.part.ts" }])
  const said = new Map(rowsOf(root, "held").map((one) => [one["slug"], one]))
  expect(said.get("top")?.["summed"]).toBe(7)
})

test("a page no page names sums to nothing rather than refusing", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  calculated(
    root,
    "summed",
    "number",
    'export function work(page, reach) { let sum = 0; for (const one of reach.naming("under-slug")) sum += one.count ?? 0; return sum }'
  )
  typed(
    root,
    "whole",
    ["held"],
    [{ pagePropertySlug: "computed-property/summed", required: false }]
  )
  filed(root, "whole", "top", {})
  const said = new Map(rowsOf(root, "held").map((one) => [one["slug"], one]))
  expect(said.get("top")?.["summed"]).toBe(0)
})
