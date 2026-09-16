import { expect, test } from "bun:test"
import { readAnswerRows } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"

const ONE = {
  id: "01a06577-2613-700d-a041-62a4896e80cc",
  page_type_id: "01a0680e-5e00-7007-a253-4c7d9b1a5108",
  title: "Home",
  icon: "home",
  attributes: { navPlace: 0, appSlug: "alanwalton" },
  page_type_slug: "nav",
  unique_key: null,
  status: null,
  completed_at: null,
  slug: "home",
  favorited_at: null,
  last_viewed_at: null,
}

test("a row the answer carries is read", () => {
  const rows = readAnswerRows({ rows: [ONE] })
  expect(rows?.length).toBe(1)
  expect(rows?.[0]?.slug).toBe("home")
})

test("an answer holding one row this reader cannot read carries none of them", () => {
  expect(readAnswerRows({ rows: [ONE, { ...ONE, id: "not a uuid" }] })).toBe(null)
})
