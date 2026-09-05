import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { listedFiled, schemaFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { workedInto } from "@akasha/pages-system/page-formulas"
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
  listedFiled(root, pageTypeSlug, slug, [{ path, id: `id-${pageTypeSlug}-${slug}` }])
  valueAlsoFiled(root, pageTypeSlug, [
    { path, value: { id: `id-${pageTypeSlug}-${slug}`, pageTypeSlug, slug, ...value } },
  ])
  return path
}

function typed(
  root: string,
  slug: string,
  above: readonly string[],
  properties: readonly Declaring[]
): undefined {
  filed(root, "page-type", slug, {
    extendsSlug: above.map((one) => `page-type/${one}`),
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

function worlded(root: string): undefined {
  propertied(root, "number-property", "count", { max: null })
  propertied(root, "formula-property", "twice", { holds: "number", formula: "{count} + {count}" })
  propertied(root, "formula-property", "thrice", {
    holds: "number",
    formula: "{count} + {count} + {count}",
  })
  typed(root, "held", [], [{ pagePropertySlug: "number-property/count", required: false }])
  typed(root, "nearer", ["held"], [{ pagePropertySlug: "formula-property/twice", required: false }])
  typed(
    root,
    "further",
    ["nearer"],
    [{ pagePropertySlug: "formula-property/thrice", required: false }]
  )
}

function rowsOf(root: string, pageTypeSlug: string): readonly Record<string, unknown>[] {
  const gathered = gatheredFor(root, pageTypeSlug, carriedFor(root, pageTypeSlug))
  const counted = computedInto(gathered.counting)
  return counted.rows.map((one, at) => {
    const working = gathered.counting[at]?.working ?? null
    return working === null ? one.value : workedInto(working, one.value, 0)
  })
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

test("a formula a page type under the one named declares is worked out on that type's rows", () => {
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
  expect(gatheredFor(root, "held", carriedFor(root, "held")).counting.length).toBe(1)
})

test("a page type under the one named whose formulas are barred is answered beside the rows", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  propertied(root, "formula-property", "unkinded", { formula: "{count}" })
  typed(
    root,
    "barred",
    ["held"],
    [{ pagePropertySlug: "formula-property/unkinded", required: false }]
  )
  filed(root, "held", "one", { count: 1 })
  filed(root, "barred", "two", { count: 2 })
  const gathered = gatheredFor(root, "held", carriedFor(root, "held"))
  expect(gathered.counting.length).toBe(2)
  expect(gathered.barred.length).toBe(1)
  expect(gathered.barred[0]?.keys).toEqual(["unkinded"])
})

test("a calculation is read from the page type that row is of", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  const at = propertied(root, "computed-property", "doubled", { holds: "number", code: "ts" })
  const beside = join(root, at.replace(/\.ts$/, ".code.ts"))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, "export function work(page) { return (page.count ?? 0) * 2 }\n")
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
