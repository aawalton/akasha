import { expect, test } from "bun:test"
import type { HeldChapter } from "akasha/alan/collection/royal-road/modules/held/royal-road-held.module.code.ts"
import type { RawChapter } from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"
import { readThrough } from "akasha/alan/collection/royal-road/modules/reading/royal-road-reading.module.code.ts"

function listed(id: string, order: number, date: string): RawChapter {
  return { id, title: id, url: `/chapter/${id}`, order, date, isUnlocked: true, visible: true }
}

function held(chapterId: string, ownProgress: number, publishedAt: string | null): HeldChapter {
  return { pageId: chapterId, slug: chapterId, chapterId, ownLength: 100, ownProgress, publishedAt }
}

const LISTED = [
  listed("a", 0, "2026-05-01T10:00:00"),
  listed("b", 1, "2026-05-02T10:00:00"),
  listed("c", 2, "2026-05-03T10:00:00"),
]

const LAST = LISTED[1] as RawChapter

function slugs(chapters: readonly HeldChapter[]): readonly string[] {
  return chapters.map((one) => one.slug)
}

test("every chapter up to and taking in the last chapter read is read", () => {
  expect(slugs(readThrough([held("a", 0, null), held("b", 0, null)], LISTED, LAST))).toEqual([
    "a",
    "b",
  ])
})

test("a chapter after the last chapter read is left as it is", () => {
  expect(slugs(readThrough([held("c", 0, null)], LISTED, LAST))).toEqual([])
})

test("a chapter read already is not read again", () => {
  expect(slugs(readThrough([held("a", 100, null)], LISTED, LAST))).toEqual([])
})

test("a chapter partly read is read the rest of the way", () => {
  expect(slugs(readThrough([held("a", 40, null)], LISTED, LAST))).toEqual(["a"])
})

test("a chapter stating no length is left as it is", () => {
  const unmeasured = { ...held("a", 0, null), ownLength: 0 }
  expect(slugs(readThrough([unmeasured], LISTED, LAST))).toEqual([])
})

test("the order royal road lists is what counts rather than a chapter's day", () => {
  const late = [listed("a", 0, "2026-09-01T10:00:00"), LAST]
  expect(slugs(readThrough([held("a", 0, "2026-09-01")], late, LAST))).toEqual(["a"])
})

test("a chapter no longer listed and published on an earlier day is read", () => {
  expect(slugs(readThrough([held("gone", 0, "2026-04-30")], LISTED, LAST))).toEqual(["gone"])
})

test("a chapter no longer listed and published that same day or later is left as it is", () => {
  const unlisted = [held("same", 0, "2026-05-02"), held("later", 0, "2026-05-03")]
  expect(slugs(readThrough(unlisted, LISTED, LAST))).toEqual([])
})

test("a chapter no longer listed and stating no day is left as it is", () => {
  expect(slugs(readThrough([held("gone", 0, null)], LISTED, LAST))).toEqual([])
})
