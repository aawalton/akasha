import { expect, test } from "bun:test"
import { join } from "node:path"
import { type Asked, asking } from "./page-asking.module.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..")

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

test("a page type no page is filed under is answered empty", () => {
  expect(rowsOf(asking(root, { pageTypeSlug: "no-such-page-type-stands" }))).toEqual([])
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
