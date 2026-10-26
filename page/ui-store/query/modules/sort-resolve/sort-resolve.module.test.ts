import { expect, test } from "bun:test"
import { asPageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { pageDataOf } from "akasha/page/ui-store/query/modules/sort-resolve/sort-resolve.module.code.ts"
import { viewMatchesRow } from "akasha/page/ui-store/query/modules/view-match/view-match.module.code.ts"

const ROW = {
  id: "01a1749a-259c-7460-81ac-5a95a0d7e256",
  page_type_id: "01a06599-ee09-7005-82e2-c1f83dc51c09",
  page_type_slug: "movie",
  title: "Riddled with Deceit",
  icon: null,
  slug: "riddled-with-deceit",
  attributes: { ownLength: 84 },
  unique_key: null,
  status: "completed",
  completed_at: "2026-10-26T02:48:55.626Z",
  favorited_at: null,
  last_viewed_at: null,
}

const UNWATCHED = [{ key: "status", notIn: ["completed", "archived", "not-applicable"] }]

function shown(row: Record<string, unknown>): boolean {
  return viewMatchesRow(pageDataOf(asPageRow(row)), UNWATCHED, {}, new Set(), new Set(), new Set())
}

test("a page's status held in its own column is read as that page's status", () => {
  expect(pageDataOf(asPageRow(ROW)).status).toBe("completed")
})

test("a view narrowed to unwatched pages leaves out a page whose column says it is completed", () => {
  expect(shown(ROW)).toBe(false)
  expect(shown({ ...ROW, status: "not-started" })).toBe(true)
})

test("an empty column leaves the value the attributes hold", () => {
  const row = { ...ROW, status: null, attributes: { status: "completed" } }
  expect(pageDataOf(asPageRow(row)).status).toBe("completed")
})

test("a page's own columns are read under their keys", () => {
  const data = pageDataOf(asPageRow(ROW))
  expect(data.title).toBe("Riddled with Deceit")
  expect(data.pageTypeSlug).toBe("movie")
  expect(data.completedAt).toBe("2026-10-26T02:48:55.626Z")
})
