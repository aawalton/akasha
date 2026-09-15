import { expect, test } from "bun:test"
import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { viewMatchesRow } from "akasha/page/ui-store/query/modules/view-match/view-match.module.code.ts"

const NONE: ReadonlySet<string> = new Set<string>()

const A_STORY = {
  slug: "azarinth-healer",
  status: "In Progress",
  externalIdentity: [{ source: "royal-road", externalId: "16946" }, { source: "kindle" }],
}

function falls(page: Readonly<Record<string, unknown>>, where: PageWhere): boolean {
  return viewMatchesRow(page, where, {}, NONE, NONE, NONE)
}

test("a condition on a plain key is weighed against the value that key holds", () => {
  expect(falls(A_STORY, [{ key: "status", eq: "In Progress" }])).toBe(true)
  expect(falls(A_STORY, [{ key: "status", eq: "Completed" }])).toBe(false)
})

test("a condition on a path holds where some value that path reaches holds it", () => {
  expect(falls(A_STORY, [{ key: "externalIdentity.source", eq: "royal-road" }])).toBe(true)
  expect(falls(A_STORY, [{ key: "externalIdentity.source", eq: "kindle" }])).toBe(true)
  expect(falls(A_STORY, [{ key: "externalIdentity.source", eq: "musicbrainz" }])).toBe(false)
})

test("a path reaching past a record with no such field weighs the records that have it", () => {
  expect(falls(A_STORY, [{ key: "externalIdentity.externalId", eq: "16946" }])).toBe(true)
})

test("a path reaching no value is weighed as a key the row carries nothing under", () => {
  expect(falls(A_STORY, [{ key: "externalIdentity.rank", eq: "B" }])).toBe(false)
  expect(falls(A_STORY, [{ key: "externalIdentity.rank", isEmpty: true }])).toBe(true)
  expect(falls(A_STORY, [{ key: "rank.source", isNull: true }])).toBe(true)
})

test("a path is weighed by every condition a plain key is weighed by", () => {
  expect(falls(A_STORY, [{ key: "externalIdentity.source", in: ["kindle", "tmdb"] }])).toBe(true)
  expect(falls(A_STORY, [{ key: "externalIdentity.source", contains: "royal" }])).toBe(true)
  expect(falls(A_STORY, [{ key: "externalIdentity.externalId", isNotEmpty: true }])).toBe(true)
})
