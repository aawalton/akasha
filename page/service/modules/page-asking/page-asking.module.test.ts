import { afterAll, expect, test } from "bun:test"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  answeringWithin,
  askedFor,
  asking,
  askingAt,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  kinds,
  levels,
  modelTests,
  over,
  persona,
  root,
  rowsOf,
  slugsOf,
} from "akasha/page/service/modules/page-asking/page-asking.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("every page of a type is answered", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "decision-kind" }))
  const slugs = rows.map((one) => one.slug)
  expect(slugs).toContain("departure")
  expect(slugs).toContain("gap")
})

test("a row holds only the keys the question names", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "decision-kind", keys: ["slug"] }))
  expect(rows.length).toBeGreaterThan(0)
  for (const one of rows) expect(Object.keys(one)).toEqual(["slug"])
})

test("a question naming no key is answered with every key", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "decision-kind" }))
  expect(Object.keys(rows[0] ?? {}).length).toBeGreaterThan(1)
})

test("where narrows to what matches", () => {
  const rows = rowsOf(
    asking(root, { pageTypeSlug: "decision-kind", where: { slug: { is: "gap" } }, keys: ["slug"] })
  )
  expect(rows).toEqual([{ slug: "gap" }])
})

test("the values a page keeps beside it are answered in place of the extension", () => {
  const rows = rowsOf(
    asking(root, {
      pageTypeSlug: "model-test",
      where: { slug: { is: "directive-kept" } },
      keys: ["cases"],
    })
  )
  const cases = rows[0]?.cases

  expect(Array.isArray(cases)).toBe(true)
  expect(Array.isArray(cases) && cases.length > 0).toBe(true)
  expect(Array.isArray(cases) && typeof cases[0]?.page).toBe("string")
})

test("a where on a key held beside the page narrows on the values read there", () => {
  const every = modelTests({ keys: ["slug", "cases"] })
  const held = every.filter((one) => Array.isArray(one.cases) && one.cases.length > 0)
  expect(held.length).toBeGreaterThan(0)
  expect(modelTests({ where: { cases: { empty: false } }, keys: ["slug"] })).toEqual(
    held.map((one) => ({ slug: one.slug }))
  )
})

test("a where on a row's page type narrows on the slug rather than the address", () => {
  expect(kinds({ type: { is: "decision-kind" } })).toEqual(kinds())
})

test("a key no page carries is tested as a page carrying nothing there", () => {
  expect(kinds().length).toBe(6)
  expect(kinds({ cover: { empty: true } })).toEqual(kinds())
  expect(kinds({ cover: { "not-in": ["nothing at all"] } })).toEqual(kinds())
})

test("a page type nothing extends and no page is filed under is answered empty", () => {
  expect(rowsOf(asking(root, { pageTypeSlug: "tracking-field" }))).toEqual([])
})

const COLLECTIONS = rowsOf(
  asking(root, {
    pageTypeSlug: "collection",
    where: { slug: { in: ["a-thousand-li-the-first-step", "ariana-grande-7-rings"] } },
    keys: ["slug", "type", "ownLength", "ownProgress", "ownRemaining"],
  })
)

test("a page type extending the one named is answered too", () => {
  const said = new Set(COLLECTIONS.map((one) => one.type))
  expect(said.has("book")).toBe(true)
  expect(said.has("song")).toBe(true)
})

test("a row carries the page type its own page states rather than the one named", () => {
  expect(COLLECTIONS.some((one) => one.type === "collection")).toBe(false)
})

test("a page type nothing extends answers its own pages alone", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "decision-kind", keys: ["type"] }))
  expect(rows.length).toBe(6)
  for (const one of rows) expect(one.type).toBe("decision-kind")
})

test("a calculation the page type named declares is worked out over a page of a type under it", () => {
  const one = COLLECTIONS.find((row) => row.slug === "a-thousand-li-the-first-step")
  expect(one?.type).toBe("book")
  expect(one?.ownLength).toBe(76750)
  expect(one?.ownRemaining).toBe(0)
})

test("a name that is no page type is refused rather than answered empty", () => {
  const said = asking(root, { pageTypeSlug: "no-such-page-type-anywhere" })
  expect("refused" in said && said.refused).toContain("names no page type")
  expect("refused" in said && said.fault).toBe("caller")
})

test("rows are ordered by the key the question sorts on", () => {
  const rows = rowsOf(
    asking(root, { pageTypeSlug: "decision-kind", sortBy: "slug", keys: ["slug"] })
  )
  const said = rows.map((one) => one.slug)
  expect(said).toEqual([...said].sort())
})

test("descending turns the order around", () => {
  const up = rowsOf(asking(root, { pageTypeSlug: "decision-kind", sortBy: "slug", keys: ["slug"] }))
  const down = rowsOf(
    asking(root, {
      pageTypeSlug: "decision-kind",
      sortBy: "slug",
      descending: true,
      keys: ["slug"],
    })
  )
  expect(down.map((one) => one.slug)).toEqual([...up.map((one) => one.slug)].reverse())
})

test("what is skipped is skipped before what is taken is taken", () => {
  const every = rowsOf(
    asking(root, { pageTypeSlug: "decision-kind", sortBy: "slug", keys: ["slug"] })
  )
  const some = rowsOf(
    asking(root, {
      pageTypeSlug: "decision-kind",
      sortBy: "slug",
      keys: ["slug"],
      offset: 1,
      limit: 2,
    })
  )
  expect(some).toEqual(every.slice(1, 3))
})

test("the count answered is every page matching rather than every row taken", () => {
  const every = asking(root, { pageTypeSlug: "decision-kind", sortBy: "slug", keys: ["slug"] })
  const some = asking(root, {
    pageTypeSlug: "decision-kind",
    sortBy: "slug",
    keys: ["slug"],
    offset: 1,
    limit: 2,
  })
  if ("refused" in every) throw new Error(every.refused)
  if ("refused" in some) throw new Error(some.refused)
  expect(some.rows.length).toBe(2)
  expect(some.n).toBe(every.rows.length)
  expect(some.n).toBeGreaterThan(some.rows.length)
})

test("a limit below nothing is refused rather than taken as none", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", limit: -1 })
  expect("refused" in asked && asked.refused).toContain("limit")
})

test("an offset that is not whole is refused", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", offset: 1.5 })
  expect("refused" in asked && asked.refused).toContain("offset")
})

test("a test this does not run is refused rather than dropped", () => {
  const asked = over({ slug: { startsWith: "dep" } })
  expect("refused" in asked && asked.refused).toContain("where.slug.startsWith")
})

test("a refusal names the tests this does run", () => {
  const asked = over({ slug: { gt: "dep" } })
  expect("refused" in asked && asked.refused).toContain("at-or-after")
})

test("a test standing beside one this does not run is refused too", () => {
  const asked = over({ slug: { is: "gap", nearly: "gap" } })
  expect("refused" in asked && asked.refused).toContain("where.slug.nearly")
})

test("a where holding only the tests already taken answers as it did", () => {
  expect(slugsOf(over({ slug: { is: "gap" } }))).toEqual(["gap"])
  expect(slugsOf(over({ slug: { in: ["gap", "absence"] } }))).toEqual(["absence", "gap"])
  expect(slugsOf(over({ slug: { empty: true } }))).toEqual([])
  expect(slugsOf(over({ decisions: { has: "nothing at all" } }))).toEqual([])
})

test("starts-with keeps the slugs beginning with what is stated", () => {
  expect(slugsOf(over({ slug: { "starts-with": "de" } }))).toEqual(["departure"])
})

test("ends-with keeps the slugs ending with what is stated", () => {
  expect(slugsOf(over({ slug: { "ends-with": "gap" } }))).toEqual(["gap", "stopgap"])
})

test("contains keeps the slugs holding what is stated", () => {
  expect(slugsOf(over({ slug: { contains: "part" } }))).toEqual(["departure"])
})

test("not-in leaves out what is named", () => {
  const left = slugsOf(over({ slug: { "not-in": ["gap", "stopgap"] } }))
  expect(left).not.toContain("gap")
  expect(left).toContain("departure")
})

test("before keeps what orders earlier than what is stated", () => {
  expect(slugsOf(over({ slug: { before: "c" } }))).toEqual(["absence"])
})

test("at-or-after keeps what is stated and what orders later", () => {
  const left = slugsOf(over({ slug: { "at-or-after": "gap" } }))
  expect(left).toEqual(["gap", "stopgap", "upkeep"])
})

test("after leaves out what is stated", () => {
  expect(slugsOf(over({ slug: { after: "gap" } }))).toEqual(["stopgap", "upkeep"])
})

test("at-or-before keeps what is stated and what orders earlier", () => {
  expect(slugsOf(over({ slug: { "at-or-before": "absence" } }))).toEqual(["absence"])
})

test("a test stating nothing is refused rather than narrowing nothing", () => {
  const asked = over({ slug: {} })
  expect("refused" in asked && asked.refused).toContain("where.slug")
})

test("a where naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, {
    pageTypeSlug: "decision-kind",
    where: { "not-a-key": { is: "gap" } },
  })
  expect("refused" in asked && asked.refused).toContain("`where` names `not-a-key`")
})

test("a sortBy naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", sortBy: "not-a-key" })
  expect("refused" in asked && asked.refused).toContain("`sortBy` names `not-a-key`")
})

test("a keys entry naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", keys: ["slug", "not-a-key"] })
  expect("refused" in asked && asked.refused).toContain("`keys` names `not-a-key`")
})

test("a refusal names the keys the page type does declare", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", sortBy: "not-a-key" })
  expect("refused" in asked && asked.refused).toContain("slug")
  expect("refused" in asked && asked.refused).toContain("decisions")
})

test("a key spelt as its property slug rather than its own key is refused", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", keys: ["decision-group-slug"] })
  expect("refused" in asked && asked.refused).toContain("decision-group-slug")
})

test("a declared key no page of the type carries is answered rather than refused", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "decision-kind", keys: ["cover"] }))
  expect(rows.length).toBeGreaterThan(0)
  for (const one of rows) expect(one.cover).toBeUndefined()
})

test("a key a type above declares is a key of the type below", () => {
  const keys = ["slug", "definition", "decisionGroup"]
  expect(rowsOf(asking(root, { pageTypeSlug: "decision-kind", keys })).length).toBeGreaterThan(0)
})

test("what a query asks for is every key it names, each under where it named it", () => {
  const wanted = askedFor({
    pageTypeSlug: "decision-kind",
    where: { slug: { is: "gap" } },
    sortBy: "slug",
    keys: ["slug", "definition"],
  })
  expect(wanted).toEqual([
    ["slug", "where"],
    ["slug", "sortBy"],
    ["slug", "keys"],
    ["definition", "keys"],
  ])
})

test("a question naming no calculated key takes what the unlimited question takes", () => {
  const named = { sortBy: "slug", keys: ["slug"] } as const
  const every = persona(named)
  const some = persona({ ...named, offset: 2, limit: 3 })
  if ("refused" in every) throw new Error(every.refused)
  if ("refused" in some) throw new Error(some.refused)
  expect(some.rows).toEqual(every.rows.slice(2, 5))
  expect(some.n).toBe(every.n)
  expect(some.n).toBeGreaterThan(some.rows.length)
})

test("a question naming no key carries the calculations of the rows it took", () => {
  const every = rowsOf(persona({ sortBy: "slug" }))
  const some = rowsOf(persona({ sortBy: "slug", offset: 2, limit: 3 }))
  expect(some).toEqual(every.slice(2, 5))
  expect(typeof some[0]?.relationshipLevel).toBe("number")
})

test("a where naming a calculated key narrows on what that calculation answered", () => {
  const every = levels(undefined)
  const below = levels({ relationshipLevel: { before: 1 } })
  const above = levels({ relationshipLevel: { "at-or-after": 1 } })
  expect(every.length).toBeGreaterThan(1)
  expect(levels({ relationshipLevel: { after: 1000000 } })).toEqual([])
  expect([...below, ...above].sort()).toEqual([...every].sort())
})

test("a sortBy naming a calculated key orders by what that calculation answered", () => {
  const rows = rowsOf(persona({ sortBy: "relationshipLevel", keys: ["relationshipLevel"] }))
  const said = rows.map((one) => Number(one.relationshipLevel))
  expect(said.length).toBeGreaterThan(1)
  expect(said).toEqual([...said].sort((one, two) => one - two))
})

test("a question asked at the commit answers the commit its rows were read at", () => {
  const asked = askingAt(root, { pageTypeSlug: "decision-kind", keys: ["slug"] })
  if ("refused" in asked) throw new Error(asked.refused)
  expect(asked.rows.length).toBe(6)
  expect(gitIn(root, ["cat-file", "-t", String(asked.at)]).trim()).toBe("commit")
})

test("an answer written out names the commit it was read at", () => {
  const said = answeringWithin({ pageTypeSlug: "a" }, { rows: [{ slug: "b" }], n: 1, at: "c" })
  expect("said" in said && JSON.parse(said.said)).toEqual({ rows: [{ slug: "b" }], n: 1, at: "c" })
})

test("an answer past what one answer carries is refused as the caller's fault", () => {
  const said = answeringWithin({ pageTypeSlug: "a" }, { rows: [{ slug: "b" }], n: 1 }, 1)
  expect("refused" in said && said.fault).toBe("caller")
})

test("a question refused answers no commit", () => {
  const asked = askingAt(root, { pageTypeSlug: "no-such-page-type-anywhere" })
  expect("refused" in asked && !("at" in asked)).toBe(true)
})

const GAP_AT = "domain/decision-kind/pages/gap.decision-kind.ts"

test("a question matching a page withheld from the asker is refused whole", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", limit: 0 }, [GAP_AT])
  expect("refused" in asked && asked.withheld).toBe(true)
  expect("refused" in asked && asked.refused).toContain("Ask your game's world builder")
})

test("a question matching no withheld page is answered", () => {
  const asked = asking(root, { pageTypeSlug: "decision-kind", where: { slug: { is: "upkeep" } } }, [
    GAP_AT,
  ])
  expect(slugsOf(asked)).toEqual(["upkeep"])
})
