import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { projectProseRows } from "akasha/story/ui/modules/story-prose-dividers/story-prose-dividers.module.code.ts"
import {
  channelSpan,
  chapterChannelEnvelope,
  chapterHrefsOf,
  chapterTurnsOf,
  frontierRowIndex,
  newestChapterAtMs,
  ROWS_AFTER_FRONTIER,
  ROWS_BEFORE_FRONTIER,
  readChapterCount,
} from "akasha/story/world/stories/read/modules/chapter-turns/chapter-turns.module.code.ts"

const chapter = (values: Record<string, unknown>): Page =>
  asPage({ pageTypeSlug: "story-chapter-read", ...values })

const chaptersNumbering = (count: number, readThrough: number): readonly Page[] =>
  Array.from({ length: count }, (_unused, at) =>
    chapter({
      id: `id-${at}`,
      title: `Chapter ${at + 1}`,
      position: at + 1,
      ...(at < readThrough ? { completedAt: "2024-01-01T00:00:00Z" } : {}),
    })
  )

const rowsOf = (pages: readonly Page[]) => projectProseRows(chapterTurnsOf(pages))

describe("chapterTurnsOf", () => {
  test("orders the chapters by the position each states", () => {
    const turns = chapterTurnsOf([
      chapter({ id: "b", title: "Two", position: 2 }),
      chapter({ id: "a", title: "One", position: 1 }),
    ])
    expect(turns.map((turn) => turn.id)).toEqual(["a", "b"])
    expect(turns.map((turn) => turn.turnNumber)).toEqual([1, 2])
  })

  test("puts a chapter stating no position after every chapter that states one", () => {
    const turns = chapterTurnsOf([
      chapter({ id: "none", title: "Loose" }),
      chapter({ id: "first", title: "One", position: 1 }),
    ])
    expect(turns.map((turn) => turn.id)).toEqual(["first", "none"])
    expect(turns[1]?.turnNumber).toBeUndefined()
  })

  test("reads a chapter stating the moment it was completed as fully read", () => {
    const turns = chapterTurnsOf([
      chapter({ id: "read", title: "Read", position: 1, completedAt: "2024-01-01T00:00:00Z" }),
      chapter({ id: "unread", title: "Unread", position: 2 }),
    ])
    expect(turns.map((turn) => turn.fullyRead)).toEqual([true, false])
  })

  test("carries no prose on a turn", () => {
    expect(chapterTurnsOf([chapter({ id: "a", title: "One", position: 1 })])[0]?.text).toBe("")
  })

  test("names a chapter with no title of its own", () => {
    expect(chapterTurnsOf([chapter({ id: "a", position: 1 })])[0]?.title).toBe("Untitled")
  })
})

describe("chapterHrefsOf", () => {
  test("reaches a chapter by its slug and the tail of its id", () => {
    const hrefs = chapterHrefsOf([
      chapter({ id: "0000000000abcdef", title: "Prologue II", slug: "prologue-ii", position: 1 }),
    ])
    expect(hrefs.get("0000000000abcdef")).toBe("/story-chapter-read/prologue-ii-00abcdef")
  })

  test("falls back to the title where a chapter states no slug", () => {
    const hrefs = chapterHrefsOf([chapter({ id: "0000000000abcdef", title: "Prologue II" })])
    expect(hrefs.get("0000000000abcdef")).toBe("/story-chapter-read/prologue-ii-00abcdef")
  })
})

describe("chapterChannelEnvelope", () => {
  test("names the story and carries every turn as prose", () => {
    const turns = chapterTurnsOf(chaptersNumbering(3, 1))
    const envelope = chapterChannelEnvelope("Cradle", turns)
    expect(envelope.title).toBe("Cradle")
    expect(envelope.chapterProse?.map((turn) => turn.id)).toEqual(["id-0", "id-1", "id-2"])
  })

  test("carries prose for a story with no chapters at all", () => {
    expect(chapterChannelEnvelope("Cradle", []).chapterProse).toEqual([])
  })
})

describe("newestChapterAtMs", () => {
  test("takes the newest moment any chapter was published at", () => {
    const rows = [
      chapter({ id: "a", publishedAt: "2023-01-01" }),
      chapter({ id: "b", publishedAt: "2024-05-06" }),
    ]
    expect(newestChapterAtMs(rows)).toBe(Date.parse("2024-05-06"))
  })

  test("falls back to the day where a chapter states no moment", () => {
    expect(newestChapterAtMs([chapter({ id: "a", publishedDay: "2022-03-04" })])).toBe(
      Date.parse("2022-03-04")
    )
  })

  test("is nothing where no chapter states when it was published", () => {
    expect(newestChapterAtMs([chapter({ id: "a" })])).toBeNull()
  })
})

describe("readChapterCount", () => {
  test("counts every chapter read rather than the chapters drawn", () => {
    expect(readChapterCount(rowsOf(chaptersNumbering(10, 4)))).toBe(4)
  })

  test("is nothing for a story with no chapters", () => {
    expect(readChapterCount([])).toBe(0)
  })
})

describe("frontierRowIndex", () => {
  test("names the first chapter that has not been read", () => {
    expect(frontierRowIndex(rowsOf(chaptersNumbering(10, 4)))).toBe(4)
  })

  test("names the last chapter where every chapter has been read", () => {
    expect(frontierRowIndex(rowsOf(chaptersNumbering(10, 10)))).toBe(9)
  })

  test("names the first chapter where none has been read", () => {
    expect(frontierRowIndex(rowsOf(chaptersNumbering(10, 0)))).toBe(0)
  })
})

describe("channelSpan", () => {
  test("is empty for a story with no chapters", () => {
    expect(channelSpan([])).toEqual({ from: 0, to: 0 })
  })

  test("holds every chapter of a story shorter than the span", () => {
    expect(channelSpan(rowsOf(chaptersNumbering(10, 4)))).toEqual({ from: 0, to: 10 })
  })

  test("holds the first unread chapter of a long story", () => {
    const rows = rowsOf(chaptersNumbering(500, 200))
    const span = channelSpan(rows)
    expect(span.from).toBe(200 - ROWS_BEFORE_FRONTIER)
    expect(span.to).toBe(200 + ROWS_AFTER_FRONTIER + 1)
    expect(span.from).toBeLessThanOrEqual(200)
    expect(span.to).toBeGreaterThan(200)
  })

  test("stops at the last chapter of a story read to its end", () => {
    expect(channelSpan(rowsOf(chaptersNumbering(500, 500))).to).toBe(500)
  })
})
