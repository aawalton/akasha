import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  chapterChannelEnvelope,
  chapterTurnsOf,
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
