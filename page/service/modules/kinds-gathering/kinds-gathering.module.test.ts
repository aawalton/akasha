import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { weight } from "akasha/alan/value/health/fitness/strength/log/properties/weight.number-property.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { relationFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { numberProperty } from "akasha/page/number-property/number-property.page-type.ts"
import {
  type Counting,
  carriedFor,
  computedInto,
  gatheredFor,
  kindsFor,
  type Testing,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  calculated,
  filed,
  kinded,
  propertied,
  typed,
  worlded,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const WEIGHT_AT = `${numberProperty.slug}/${weight.slug}`

const SESSIONS = "sessions"

const SESSION_ROWS = ['{"stretch":"morning"}']

function stretched(root: string): undefined {
  worlded(root)
  propertied(root, "page-property-entry", SESSIONS, {})
  typed(
    root,
    "stretched",
    ["held"],
    [{ pagePropertySlug: `page-property-entry/${SESSIONS}`, required: false }]
  )
}

const SESSIONS_KIND = "sessions-kind"

function deepened(root: string): undefined {
  worlded(root)
  kinded(root, "page-property-entry")
  typed(root, SESSIONS_KIND, ["page-property-entry"], [])
  filed(root, SESSIONS_KIND, SESSIONS, { propertySlug: SESSIONS })
  typed(
    root,
    "deepened",
    ["held"],
    [{ pagePropertySlug: `${SESSIONS_KIND}/${SESSIONS}`, required: false }]
  )
}

function sessioned(
  root: string,
  slug: string,
  count: number,
  rows: readonly string[] | null
): undefined {
  const at = filed(root, "stretched", slug, { count, [SESSIONS]: "jsonl" })
  if (rows === null) return
  const beside = join(root, at.replace(/\.ts$/, `.${SESSIONS}.jsonl`))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, `${rows.join("\n")}\n`)
}

function narrowing(key: string, held: unknown): ReadonlyMap<string, Testing> {
  return new Map<string, Testing>([[key, (value) => value[key] === held]])
}

function gathered(root: string, tests: ReadonlyMap<string, Testing> | null): readonly Counting[] {
  return gatheredFor(root, "held", carriedFor(root, "held"), [], readingIn(root), null, tests)
}

function opened(counting: readonly Counting[]): number {
  let found = 0
  for (const one of counting) if (Array.isArray(one.row.value[SESSIONS])) found += 1
  return found
}

function slugsIn(counting: readonly Counting[]): readonly unknown[] {
  return counting.map((one) => one.row.value["slug"])
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
  expect(rowsOf(root, "held").map((one) => one["type"])).toEqual([
    "page-type/further",
    "page-type/held",
  ])
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
  typed(root, "lifter", [], [{ pagePropertySlug: WEIGHT_AT, required: false }])
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

test("what a calculation read is answered under its computed property's page", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  propertied(root, "number-property", "weight", { max: null })
  typed(root, "lifter", [], [{ pagePropertySlug: WEIGHT_AT, required: false }])
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
  const alan = filed(root, "lifter", "alan", { weight: 180 })
  filed(root, "lifted", "one", { count: 2 })
  const counted = computedInto(root, gatheredFor(root, "held", carriedFor(root, "held")))
  const read = [...counted.read.entries()]
  expect(read.length).toBe(1)
  expect(read[0]?.[0]).toContain("loaded")
  expect([...(read[0]?.[1].files ?? [])]).toEqual([alan])
  expect(read[0]?.[1].folders.size).toBe(0)
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

test("a test on a key a page's own body carries opens the files beside that page alone", () => {
  const root = scratch.rootFor("akasha-kinds-")
  stretched(root)
  sessioned(root, "one", 1, SESSION_ROWS)
  sessioned(root, "two", 2, SESSION_ROWS)
  sessioned(root, "three", 3, SESSION_ROWS)
  expect(opened(gathered(root, null))).toBe(3)
  const held = gathered(root, narrowing("count", 1))
  expect(opened(held)).toBe(1)
  expect(slugsIn(held)).toEqual(["one"])
  expect(held[0]?.row.value[SESSIONS]).toEqual([{ stretch: "morning" }])
})

test("a property whose page type is under an entry shape is read from beside the page", () => {
  const root = scratch.rootFor("akasha-kinds-")
  deepened(root)
  const at = filed(root, "deepened", "one", { count: 1, [SESSIONS]: "jsonl" })
  const beside = join(root, at.replace(/\.ts$/, `.${SESSIONS}.jsonl`))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, `${SESSION_ROWS.join("\n")}\n`)

  expect(gathered(root, null)[0]?.row.value[SESSIONS]).toEqual([{ stretch: "morning" }])
})

test("a test on a key under an entry shape is passed over rather than run before the read", () => {
  const root = scratch.rootFor("akasha-kinds-")
  deepened(root)
  const at = filed(root, "deepened", "one", { count: 1, [SESSIONS]: "jsonl" })
  const beside = join(root, at.replace(/\.ts$/, `.${SESSIONS}.jsonl`))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, `${SESSION_ROWS.join("\n")}\n`)

  expect(slugsIn(gathered(root, narrowing(SESSIONS, "no stretch is this")))).toEqual(["one"])
})

test("a page a test leaves out has the file beside that page left unopened", () => {
  const root = scratch.rootFor("akasha-kinds-")
  stretched(root)
  sessioned(root, "one", 1, SESSION_ROWS)
  sessioned(root, "two", 2, null)
  expect(() => gathered(root, null)).toThrow("no file is there")
  expect(slugsIn(gathered(root, narrowing("count", 1)))).toEqual(["one"])
})

test("a test on a key held beside a page is passed over rather than run before the read", () => {
  const root = scratch.rootFor("akasha-kinds-")
  stretched(root)
  sessioned(root, "one", 1, SESSION_ROWS)
  sessioned(root, "two", 2, SESSION_ROWS)
  expect(slugsIn(gathered(root, narrowing(SESSIONS, "no stretch is this")))).toEqual(["one", "two"])
})

test("a test on a key a calculation works out is passed over rather than run before the read", () => {
  const root = scratch.rootFor("akasha-kinds-")
  stretched(root)
  filed(root, "nearer", "two", { count: 2 })
  filed(root, "further", "three", { count: 3 })
  const held = gathered(root, narrowing("twice", "no calculation answers this"))
  expect([...slugsIn(held)].sort()).toEqual(["three", "two"])
})

test("a test a page has no value for is run as the caller wrote that test", () => {
  const root = scratch.rootFor("akasha-kinds-")
  stretched(root)
  sessioned(root, "one", 1, SESSION_ROWS)
  filed(root, "held", "two", {})
  const bare = new Map<string, Testing>([["count", (value) => value["count"] === undefined]])
  expect(slugsIn(gathered(root, bare))).toEqual(["two"])
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

test("a calculation holding a relation answers a page of the page type it states it reaches", () => {
  const root = scratch.rootFor("akasha-kinds-")
  worlded(root)
  typed(root, "lifter", [], [])
  calculated(
    root,
    "spotter",
    "relation",
    'export function work(page) { return page.count === 1 ? "lifter/alan" : "lifter/nobody" }',
    { targetPageType: "page-type/lifter" }
  )
  typed(
    root,
    "spotted",
    ["held"],
    [{ pagePropertySlug: "computed-property/spotter", required: false }]
  )
  filed(root, "lifter", "alan", {})
  filed(root, "spotted", "one", { count: 1 })
  filed(root, "spotted", "two", { count: 2 })
  const counted = computedInto(root, gatheredFor(root, "held", carriedFor(root, "held")))
  const said = new Map(counted.rows.map((one) => [one.value["slug"], one.value]))
  expect(said.get("one")?.["spotter"]).toBe("lifter/alan")
  expect(said.get("two")?.["spotter"]).toBeUndefined()
  expect(counted.dark.get("spotter")).toContain("which names no page")
})
