import { expect, test } from "bun:test"
import { readAnswerRows } from "./fetch-attach.module.code.ts"

const ONE = {
  id: "01a06577-2613-700d-a041-62a4896e80cc",
  page_type_id: "01a0680e-5e00-7007-a253-4c7d9b1a5108",
  seq: null,
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

test("a page carrying no sequence number is read rather than thrown away", () => {
  const rows = readAnswerRows({ rows: [ONE] })
  expect(rows?.length).toBe(1)
  expect(rows?.[0]?.seq).toBe(null)
  expect(rows?.[0]?.slug).toBe("home")
})

test("a sequence number written as text is read as a number", () => {
  const rows = readAnswerRows({ rows: [{ ...ONE, seq: "12" }] })
  expect(rows?.[0]?.seq).toBe(12)
})

test("a sequence number that is neither is refused", () => {
  expect(readAnswerRows({ rows: [{ ...ONE, seq: "not a number" }] })).toBe(null)
})

test("an answer holding one row this reader cannot read carries none of them", () => {
  expect(readAnswerRows({ rows: [ONE, { ...ONE, id: "not a uuid" }] })).toBe(null)
})
