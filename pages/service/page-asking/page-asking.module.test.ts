import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  type Asked,
  askedFor,
  asking,
  keysOf,
  meets,
  ownerFor,
  type Query,
} from "./page-asking.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..")

function typesHeld(
  types: Readonly<Record<string, Record<string, unknown>>>
): Map<string, ReadonlyMap<string, Record<string, unknown>>> {
  const made = new Map<string, ReadonlyMap<string, Record<string, unknown>>>()
  made.set("page-type", new Map(Object.entries(types)))
  return made
}

test("a page type naming one above it reads the owner that climb carries", () => {
  expect(ownerFor(root, new Map(), "temper-catalog-thing")).toBe("account-page")
  expect(ownerFor(root, new Map(), "invariant-kind")).toBeNull()
})

test("the owner is read from the second page type above where the first states none", () => {
  const held = typesHeld({
    under: { extendsSlug: ["page-type/one", "page-type/two"] },
    one: {},
    two: { ownerSlug: "account-page" },
  })
  expect(ownerFor(root, held, "under")).toBe("account-page")
})

test("the owner is taken from the nearer of the page types above", () => {
  const held = typesHeld({
    under: { extendsSlug: ["page-type/close", "page-type/apart"] },
    close: { extendsSlug: "page-type/distant" },
    apart: { ownerSlug: "apart-owner" },
    distant: { ownerSlug: "distant-owner" },
  })
  expect(ownerFor(root, held, "under")).toBe("apart-owner")
})

test("where two page types above are equally near, the owner is the last one named", () => {
  const held = typesHeld({
    under: { extendsSlug: ["page-type/first", "page-type/second"] },
    first: { ownerSlug: "first-owner" },
    second: { ownerSlug: "second-owner" },
  })
  expect(ownerFor(root, held, "under")).toBe("second-owner")
})

test("a page type above that nothing holds stops no other climb", () => {
  const held = typesHeld({
    under: { extendsSlug: ["page-type/there", "page-type/nothing-holds-this"] },
    there: { ownerSlug: "there-owner" },
  })
  expect(ownerFor(root, held, "under")).toBe("there-owner")
})

function rowsOf(asked: Asked): readonly Record<string, unknown>[] {
  if ("refused" in asked) throw new Error(`refused: ${asked.refused}`)
  return asked.rows
}

test("every page of a type is answered", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "invariant-kind" }))
  const slugs = rows.map((one) => one.slug)
  expect(slugs).toContain("departure")
  expect(slugs).toContain("gap")
})

test("a row holds only the keys the question names", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "invariant-kind", keys: ["slug"] }))
  expect(rows.length).toBeGreaterThan(0)
  for (const one of rows) expect(Object.keys(one)).toEqual(["slug"])
})

test("a question naming no key is answered with every key", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "invariant-kind" }))
  expect(Object.keys(rows[0] ?? {}).length).toBeGreaterThan(1)
})

test("where narrows to what matches", () => {
  const rows = rowsOf(
    asking(root, { pageTypeSlug: "invariant-kind", where: { slug: { is: "gap" } }, keys: ["slug"] })
  )
  expect(rows).toEqual([{ slug: "gap" }])
})

test("the values a page keeps beside it are answered in place of the extension", () => {
  const rows = rowsOf(
    asking(root, {
      pageTypeSlug: "model-test",
      where: { slug: { is: "restatement" } },
      keys: ["cases"],
    })
  )
  const cases = rows[0]?.cases

  expect(Array.isArray(cases) && cases.length).toBe(14)
  expect(Array.isArray(cases) && cases[0]?.page).toBe("code-lint")
})

test("a page type no page is filed under is answered empty", () => {
  expect(rowsOf(asking(root, { pageTypeSlug: "service" }))).toEqual([])
})

test("a name that is no page type is refused rather than answered empty", () => {
  const said = asking(root, { pageTypeSlug: "no-such-page-type-anywhere" })
  expect("refused" in said && said.refused).toContain("names no page type")
})

test("rows are ordered by the key the question sorts on", () => {
  const rows = rowsOf(
    asking(root, { pageTypeSlug: "invariant-kind", sortBy: "slug", keys: ["slug"] })
  )
  const said = rows.map((one) => one.slug)
  expect(said).toEqual([...said].sort())
})

test("descending turns the order around", () => {
  const up = rowsOf(
    asking(root, { pageTypeSlug: "invariant-kind", sortBy: "slug", keys: ["slug"] })
  )
  const down = rowsOf(
    asking(root, {
      pageTypeSlug: "invariant-kind",
      sortBy: "slug",
      descending: true,
      keys: ["slug"],
    })
  )
  expect(down.map((one) => one.slug)).toEqual([...up.map((one) => one.slug)].reverse())
})

test("what is skipped is skipped before what is taken is taken", () => {
  const every = rowsOf(
    asking(root, { pageTypeSlug: "invariant-kind", sortBy: "slug", keys: ["slug"] })
  )
  const some = rowsOf(
    asking(root, {
      pageTypeSlug: "invariant-kind",
      sortBy: "slug",
      keys: ["slug"],
      offset: 1,
      limit: 2,
    })
  )
  expect(some).toEqual(every.slice(1, 3))
})

test("a limit below nothing is refused rather than taken as none", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", limit: -1 })
  expect("refused" in asked && asked.refused).toContain("limit")
})

test("an offset that is not whole is refused", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", offset: 1.5 })
  expect("refused" in asked && asked.refused).toContain("offset")
})

function slugsOf(asked: Asked): readonly unknown[] {
  return rowsOf(asked).map((one) => one.slug)
}

function over(where: unknown): Asked {
  return asking(root, {
    pageTypeSlug: "invariant-kind",
    where: where as Query["where"],
    keys: ["slug"],
  })
}

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
  expect(slugsOf(over({ invariants: { has: "nothing at all" } }))).toEqual([])
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

test("an ordering test reads two instants as instants", () => {
  const held = { at: "2026-08-30T12:00:00Z" }
  expect(meets(held, "at", { "at-or-after": "2026-08-30" })).toBe(true)
  expect(meets(held, "at", { before: "2026-08-01" })).toBe(false)
  expect(meets(held, "at", { before: "2026-09-01" })).toBe(true)
})

test("an ordering test reads two numbers as numbers", () => {
  expect(meets({ n: 9 }, "n", { before: 10 })).toBe(true)
  expect(meets({ n: 9 }, "n", { before: 5 })).toBe(false)
})

test("an ordering test over nothing held keeps nothing", () => {
  expect(meets({}, "at", { before: "2026-09-01" })).toBe(false)
})

test("a test stating nothing is refused rather than narrowing nothing", () => {
  const asked = over({ slug: {} })
  expect("refused" in asked && asked.refused).toContain("where.slug")
})

test("a where naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, {
    pageTypeSlug: "invariant-kind",
    where: { "not-a-key": { is: "gap" } },
  })
  expect("refused" in asked && asked.refused).toContain("`where` names `not-a-key`")
})

test("a sortBy naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", sortBy: "not-a-key" })
  expect("refused" in asked && asked.refused).toContain("`sortBy` names `not-a-key`")
})

test("a keys entry naming a key the page type declares nothing for is refused", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", keys: ["slug", "not-a-key"] })
  expect("refused" in asked && asked.refused).toContain("`keys` names `not-a-key`")
})

test("a refusal names the keys the page type does declare", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", sortBy: "not-a-key" })
  expect("refused" in asked && asked.refused).toContain("slug")
  expect("refused" in asked && asked.refused).toContain("invariants")
})

test("a key spelt as its property slug rather than its own key is refused", () => {
  const asked = asking(root, { pageTypeSlug: "invariant-kind", keys: ["invariant-group-slug"] })
  expect("refused" in asked && asked.refused).toContain("invariant-group-slug")
})

test("a declared key no page of the type carries is answered rather than refused", () => {
  const rows = rowsOf(asking(root, { pageTypeSlug: "invariant-kind", keys: ["cover"] }))
  expect(rows.length).toBeGreaterThan(0)
  for (const one of rows) expect(one.cover).toBeUndefined()
})

test("a key a type above declares is a key of the type below", () => {
  const keys = keysOf(root, "invariant-kind")
  expect(keys.has("slug")).toBe(true)
  expect(keys.has("definition")).toBe(true)
  expect(keys.has("invariantGroupSlug")).toBe(true)
})

test("what a query asks for is every key it names, each under where it named it", () => {
  const wanted = askedFor({
    pageTypeSlug: "invariant-kind",
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
