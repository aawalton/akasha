import { describe, expect, test } from "bun:test"
import { composeStorySession } from "./story-session-compose"
import { expectedHref, turn } from "./story-session-compose.test-helpers"

describe("composeStorySession", () => {
  test("href: readerBaseUrl null → host-relative, param derives from slug when present", () => {
    const withSlug = turn({
      id: "ffffffff-0000-0000-0000-11111111aaaa",
      title: "Ignored Title",
      slug: "the-real-slug",
      turnNumber: 0,
      sessionNumber: 1,
    })
    const { chapters } = composeStorySession({
      rows: [withSlug],
      currentSession: 2,
      readerBaseUrl: null,
    })
    const href = chapters[0]?.href ?? ""
    expect(href.startsWith("/game-turn/")).toBe(true)
    expect(href).toBe(expectedHref(withSlug, null))
    expect(href).toContain("the-real-slug-")
  })

  test("href: no slug → param derives from title + id suffix", () => {
    const noSlug = turn({
      id: "ffffffff-0000-0000-0000-22222222bbbb",
      title: "Title Becomes Slug",
      slug: null,
      turnNumber: 0,
      sessionNumber: 1,
    })
    const { chapters } = composeStorySession({
      rows: [noSlug],
      currentSession: 2,
      readerBaseUrl: null,
    })
    expect(chapters[0]?.href).toBe(expectedHref(noSlug, null))
    expect(chapters[0]?.href).toContain("title-becomes-slug-")
  })

  test("rows with a non-string id are skipped entirely", () => {
    const bad = turn({ id: 12345, title: "No String Id", turnNumber: 0, sessionNumber: 2 })
    const good = turn({
      id: "99999999-0000-0000-0000-000000000001",
      title: "Good",
      text: "ok",
      turnNumber: 1,
      sessionNumber: 2,
    })
    const { current } = composeStorySession({
      rows: [bad, good],
      currentSession: 2,
      readerBaseUrl: null,
    })
    expect(current).toEqual([
      { id: "99999999-0000-0000-0000-000000000001", title: "Good", text: "ok", turnNumber: 1 },
    ])
  })

  test("empty rows → empty outputs", () => {
    expect(composeStorySession({ rows: [], currentSession: 1, readerBaseUrl: null })).toEqual({
      chapters: [],
      current: [],
    })
  })

  test("session 0 is a real completed session, not falsy-dropped into current", () => {
    const s0first = turn({
      id: "20000000-0000-0000-0000-000000000001",
      title: "Prologue",
      turnNumber: 0,
      sessionNumber: 0,
    })
    const now = turn({
      id: "20000000-0000-0000-0000-000000000002",
      title: "Now",
      text: "live",
      turnNumber: 1,
      sessionNumber: 1,
    })
    const { current, chapters } = composeStorySession({
      rows: [s0first, now],
      currentSession: 1,
      readerBaseUrl: null,
    })

    expect(chapters).toEqual([
      {
        id: "20000000-0000-0000-0000-000000000001",
        title: "Session 0",
        href: expectedHref(s0first, null),
        chapterNumber: 0,
      },
    ])
    expect(current).toEqual([
      { id: "20000000-0000-0000-0000-000000000002", title: "Now", text: "live", turnNumber: 1 },
    ])
  })

  test("legacy 'complete' status renders as a live turn", () => {
    const rows = [
      turn({
        id: "c0000000-0000-0000-0000-000000000001",
        title: "Legacy",
        text: "legacy-body",
        turnNumber: 0,
        status: "complete",
        sessionNumber: 2,
      }),
    ]
    const { current } = composeStorySession({ rows, currentSession: 2, readerBaseUrl: null })
    expect(current).toEqual([
      {
        id: "c0000000-0000-0000-0000-000000000001",
        title: "Legacy",
        text: "legacy-body",
        turnNumber: 0,
      },
    ])
  })

  test("a turn with missing status renders as published — never hidden", () => {
    const rows = [
      turn({
        id: "c0000000-0000-0000-0000-000000000002",
        title: "No Status",
        text: "kept",
        turnNumber: 0,
        status: undefined,
        sessionNumber: 2,
      }),
    ]
    const { current } = composeStorySession({ rows, currentSession: 2, readerBaseUrl: null })
    expect(current).toEqual([
      {
        id: "c0000000-0000-0000-0000-000000000002",
        title: "No Status",
        text: "kept",
        turnNumber: 0,
      },
    ])
  })

  test("realistic dnd shape: 18 turns, session 0 for 0..5, session 1 for 6..15, session 2 for 16..17, currentSession 2", () => {
    const rows = Array.from({ length: 18 }, (_, i) =>
      turn({
        id: `10000000-0000-0000-0000-0000000000${String(i).padStart(2, "0")}`,
        title: `Turn ${i}`,
        text: `body ${i}`,
        turnNumber: i,
        sessionNumber: i <= 5 ? 0 : i <= 15 ? 1 : 2,
      })
    )
    const { current, chapters } = composeStorySession({
      rows,
      currentSession: 2,
      readerBaseUrl: null,
    })

    expect(current).toEqual([
      {
        id: "10000000-0000-0000-0000-000000000016",
        title: "Turn 16",
        text: "body 16",
        turnNumber: 16,
      },
      {
        id: "10000000-0000-0000-0000-000000000017",
        title: "Turn 17",
        text: "body 17",
        turnNumber: 17,
      },
    ])

    const turnZero = rows[0]
    const turnSix = rows[6]
    if (turnZero === undefined || turnSix === undefined) throw new Error("fixture: turn missing")
    expect(chapters).toHaveLength(2)
    expect(chapters[0]).toEqual({
      id: "10000000-0000-0000-0000-000000000000",
      title: "Session 0",
      href: expectedHref(turnZero, null),
      chapterNumber: 0,
    })
    expect(chapters[1]).toEqual({
      id: "10000000-0000-0000-0000-000000000006",
      title: "Session 1",
      href: expectedHref(turnSix, null),
      chapterNumber: 1,
    })
  })
})
