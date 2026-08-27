import { describe, expect, test } from "bun:test"
import { composeStorySession, pickLatestPublishedSnapshot } from "./story-session-compose"
import { expectedHref, turn } from "./story-session-compose.test-helpers"

describe("composeStorySession", () => {
  test("live surface: all current-session published turns in input order, freshest last", () => {
    const rows = [
      turn({
        id: "aaaaaaaa-0000-0000-0000-000000000001",
        title: "One",
        text: "first",
        turnNumber: 0,
        sessionNumber: 2,
      }),
      turn({
        id: "aaaaaaaa-0000-0000-0000-000000000002",
        title: "Two",
        text: "second",
        turnNumber: 1,
        sessionNumber: 2,
      }),
      turn({
        id: "aaaaaaaa-0000-0000-0000-000000000003",
        title: "Three",
        text: "third",
        turnNumber: 2,
        sessionNumber: 2,
      }),
    ]
    const { current, chapters } = composeStorySession({
      rows,
      currentSession: 2,
      readerBaseUrl: null,
    })

    expect(current).toEqual([
      { id: "aaaaaaaa-0000-0000-0000-000000000001", title: "One", text: "first", turnNumber: 0 },
      { id: "aaaaaaaa-0000-0000-0000-000000000002", title: "Two", text: "second", turnNumber: 1 },
      { id: "aaaaaaaa-0000-0000-0000-000000000003", title: "Three", text: "third", turnNumber: 2 },
    ])
    expect(current.at(-1)?.text).toBe("third")
    expect(chapters).toEqual([])
  })

  test("#15077: a row carrying bankedRemainder never leaks it into the reader projection", () => {
    const rows = [
      turn({
        id: "dddddddd-0000-0000-0000-000000000001",
        title: "Cut",
        text: "the published slice",
        turnNumber: 0,
        sessionNumber: 2,
        bankedRemainder: "...and past the cut, prose the reader has not earned yet.",
      }),
    ]
    const { current } = composeStorySession({ rows, currentSession: 2, readerBaseUrl: null })
    expect(current).toEqual([
      {
        id: "dddddddd-0000-0000-0000-000000000001",
        title: "Cut",
        text: "the published slice",
        turnNumber: 0,
      },
    ])
    expect(current[0]).not.toHaveProperty("bankedRemainder")
  })

  test("a turn missing sessionNumber lands in the current session", () => {
    const rows = [
      turn({
        id: "bbbbbbbb-0000-0000-0000-000000000001",
        title: "Loose",
        text: "no-session",
        turnNumber: 0,
        sessionNumber: undefined,
      }),
    ]
    const { current } = composeStorySession({ rows, currentSession: 4, readerBaseUrl: null })
    expect(current).toEqual([
      {
        id: "bbbbbbbb-0000-0000-0000-000000000001",
        title: "Loose",
        text: "no-session",
        turnNumber: 0,
      },
    ])
  })

  test("drafts are excluded from both current and chapters", () => {
    const rows = [
      turn({
        id: "cccccccc-0000-0000-0000-000000000001",
        title: "Draft-current",
        turnNumber: 0,
        status: "draft",
        sessionNumber: 2,
      }),
      turn({
        id: "cccccccc-0000-0000-0000-000000000002",
        title: "Draft-past",
        turnNumber: 1,
        status: "draft",
        sessionNumber: 1,
      }),
      turn({
        id: "cccccccc-0000-0000-0000-000000000003",
        title: "Live",
        text: "kept",
        turnNumber: 2,
        status: "published",
        sessionNumber: 2,
      }),
    ]
    const { current, chapters } = composeStorySession({
      rows,
      currentSession: 2,
      readerBaseUrl: null,
    })
    expect(current).toEqual([
      { id: "cccccccc-0000-0000-0000-000000000003", title: "Live", text: "kept", turnNumber: 2 },
    ])
    expect(chapters).toEqual([])
  })

  test("consolidation: sessions 1 and 2 with currentSession 3 → two chapters, first turn of each", () => {
    const s1first = turn({
      id: "dddddddd-0000-0000-0000-000000000001",
      title: "S1 First",
      slug: "s1-first",
      turnNumber: 0,
      sessionNumber: 1,
    })
    const s1second = turn({
      id: "dddddddd-0000-0000-0000-000000000002",
      title: "S1 Second",
      turnNumber: 1,
      sessionNumber: 1,
    })
    const s2first = turn({
      id: "dddddddd-0000-0000-0000-000000000003",
      title: "S2 First",
      slug: "s2-first",
      turnNumber: 2,
      sessionNumber: 2,
    })
    const s2second = turn({
      id: "dddddddd-0000-0000-0000-000000000004",
      title: "S2 Second",
      turnNumber: 3,
      sessionNumber: 2,
    })
    const rows = [s1first, s1second, s2first, s2second]

    const { chapters } = composeStorySession({ rows, currentSession: 3, readerBaseUrl: null })

    expect(chapters).toHaveLength(2)
    expect(chapters[0]).toEqual({
      id: "dddddddd-0000-0000-0000-000000000001",
      title: "Session 1",
      href: expectedHref(s1first, null),
      chapterNumber: 1,
    })
    expect(chapters[1]).toEqual({
      id: "dddddddd-0000-0000-0000-000000000003",
      title: "Session 2",
      href: expectedHref(s2first, null),
      chapterNumber: 2,
    })
  })

  test("current-session rows never appear in chapters; completed-session rows never appear in current", () => {
    const past = turn({
      id: "eeeeeeee-0000-0000-0000-000000000001",
      title: "Past",
      text: "old",
      turnNumber: 0,
      sessionNumber: 1,
    })
    const now = turn({
      id: "eeeeeeee-0000-0000-0000-000000000002",
      title: "Now",
      text: "new",
      turnNumber: 1,
      sessionNumber: 2,
    })
    const { current, chapters } = composeStorySession({
      rows: [past, now],
      currentSession: 2,
      readerBaseUrl: null,
    })

    const currentIds = current.map((t) => t.id)
    const chapterIds = chapters.map((c) => c.id)
    expect(currentIds).toEqual(["eeeeeeee-0000-0000-0000-000000000002"])
    expect(chapterIds).toEqual(["eeeeeeee-0000-0000-0000-000000000001"])
    expect(chapterIds).not.toContain("eeeeeeee-0000-0000-0000-000000000002")
    expect(currentIds).not.toContain("eeeeeeee-0000-0000-0000-000000000001")
  })
})

describe("pickLatestPublishedSnapshot", () => {
  test("returns the snapshot of the latest published turn", () => {
    const rows = [
      turn({ id: "s0-1", turnNumber: 0, sheetSnapshot: { turn: 0 } }),
      turn({ id: "s0-2", turnNumber: 1, sheetSnapshot: { turn: 1 } }),
    ]
    expect(pickLatestPublishedSnapshot(rows)).toEqual({ turn: 1 })
  })

  test("draft turns are ignored even when they carry a snapshot", () => {
    const rows = [
      turn({ id: "s1-1", turnNumber: 0, status: "published", sheetSnapshot: { turn: 0 } }),
      turn({ id: "s1-2", turnNumber: 1, status: "draft", sheetSnapshot: { turn: 99 } }),
    ]
    expect(pickLatestPublishedSnapshot(rows)).toEqual({ turn: 0 })
  })

  test("latest published turn without a snapshot → null (fall back to live state)", () => {
    const rows = [
      turn({ id: "s2-1", turnNumber: 0, sheetSnapshot: { turn: 0 } }),
      turn({ id: "s2-2", turnNumber: 1, sheetSnapshot: undefined }),
    ]
    expect(pickLatestPublishedSnapshot(rows)).toBeNull()
  })

  test("no published turns → null", () => {
    const rows = [turn({ id: "s3-1", turnNumber: 0, status: "draft", sheetSnapshot: { turn: 0 } })]
    expect(pickLatestPublishedSnapshot(rows)).toBeNull()
  })

  test("empty rows → null", () => {
    expect(pickLatestPublishedSnapshot([])).toBeNull()
  })

  test("legacy 'complete' turn's snapshot counts as published", () => {
    const rows = [
      turn({ id: "s4-1", turnNumber: 0, status: "complete", sheetSnapshot: { turn: 7 } }),
    ]
    expect(pickLatestPublishedSnapshot(rows)).toEqual({ turn: 7 })
  })
})

describe("composeStorySession — fullyRead derivation (#15073)", () => {
  function currentFor(overrides: Record<string, unknown>) {
    const { current } = composeStorySession({
      rows: [turn({ id: "f-1", turnNumber: 0, sessionNumber: 1, ...overrides })],
      currentSession: 1,
      readerBaseUrl: null,
    })
    return current[0]
  }

  test("completedAt present → fullyRead: true", () => {
    expect(currentFor({ completedAt: "2026-07-14T00:00:00.000Z" })?.fullyRead).toBe(true)
    expect(currentFor({ completedAt: 1_752_000_000_000 })?.fullyRead).toBe(true)
  })

  test("no completedAt (unread) → no fullyRead key", () => {
    expect(currentFor({ wordCount: 100 })).not.toHaveProperty("fullyRead")
  })

  test("null completedAt → no fullyRead key", () => {
    expect(currentFor({ completedAt: null })).not.toHaveProperty("fullyRead")
  })

  test("an unread turn's projection is byte-identical to before (no extra key)", () => {
    expect(currentFor({ title: "One", text: "first" })).toEqual({
      id: "f-1",
      title: "One",
      text: "first",
      turnNumber: 0,
    })
  })
})
