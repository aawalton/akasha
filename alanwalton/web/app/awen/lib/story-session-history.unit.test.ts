import { describe, expect, test } from "bun:test"
import { composeStorySession } from "./story-session-compose"

function turn(overrides: Record<string, unknown>): Record<string, unknown> {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    title: "A Turn",
    slug: null,
    turnNumber: 0,
    status: "published",
    text: "prose",
    sessionNumber: 1,
    ...overrides,
  }
}

describe("composeStorySession — history scope (#14458)", () => {
  const s1a = turn({
    id: "31000000-0000-0000-0000-000000000001",
    title: "S1 Alpha",
    text: "alpha",
    turnNumber: 0,
    sessionNumber: 1,
  })
  const s1b = turn({
    id: "31000000-0000-0000-0000-000000000002",
    title: "S1 Beta",
    text: "beta",
    turnNumber: 1,
    sessionNumber: 1,
  })
  const s2a = turn({
    id: "31000000-0000-0000-0000-000000000003",
    title: "S2 Alpha",
    text: "gamma",
    turnNumber: 2,
    sessionNumber: 2,
  })
  const liveHitRows = [s1a, s1b, s2a]

  test("live-hit regression: history:full keeps every published prior-session turn visible after a currentSession bump", () => {
    const { current } = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "full",
    })
    expect(current).toEqual([
      {
        id: "31000000-0000-0000-0000-000000000001",
        title: "S1 Alpha",
        text: "alpha",
        turnNumber: 0,
        sessionNumber: 1,
      },
      {
        id: "31000000-0000-0000-0000-000000000002",
        title: "S1 Beta",
        text: "beta",
        turnNumber: 1,
        sessionNumber: 1,
      },
      {
        id: "31000000-0000-0000-0000-000000000003",
        title: "S2 Alpha",
        text: "gamma",
        turnNumber: 2,
        sessionNumber: 2,
      },
    ])
  })

  test("default (undeclared) collapses to current session only, with no sessionNumber key", () => {
    const { current } = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
    })
    expect(current).toEqual([
      {
        id: "31000000-0000-0000-0000-000000000003",
        title: "S2 Alpha",
        text: "gamma",
        turnNumber: 2,
      },
    ])
    expect(current[0] && "sessionNumber" in current[0]).toBe(false)
  })

  test('explicit history:"session" equals the default', () => {
    const explicit = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "session",
    })
    const defaulted = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
    })
    expect(explicit).toEqual(defaulted)
  })

  test("history:full — a turn missing sessionNumber reads as the current session", () => {
    const loose = turn({
      id: "32000000-0000-0000-0000-000000000001",
      title: "Loose",
      text: "no-session",
      turnNumber: 0,
      sessionNumber: undefined,
    })
    const { current } = composeStorySession({
      rows: [loose],
      currentSession: 3,
      readerBaseUrl: null,
      history: "full",
    })
    expect(current).toEqual([
      {
        id: "32000000-0000-0000-0000-000000000001",
        title: "Loose",
        text: "no-session",
        turnNumber: 0,
        sessionNumber: 3,
      },
    ])
  })

  test("chapters (storySoFar source:turns) are identical under both history modes", () => {
    const session = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "session",
    })
    const full = composeStorySession({
      rows: liveHitRows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "full",
    })
    expect(full.chapters).toEqual(session.chapters)
    expect(full.chapters).toHaveLength(1)
    expect(full.chapters[0]?.chapterNumber).toBe(1)
  })

  test("history:full multi-session — full turnNumber-asc order with session tags", () => {
    const rows = Array.from({ length: 6 }, (_, i) =>
      turn({
        id: `33000000-0000-0000-0000-0000000000${String(i).padStart(2, "0")}`,
        title: `Turn ${i}`,
        text: `body ${i}`,
        turnNumber: i,
        sessionNumber: i <= 2 ? 1 : 2,
      })
    )
    const { current } = composeStorySession({
      rows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "full",
    })
    expect(current.map((t) => t.turnNumber)).toEqual([0, 1, 2, 3, 4, 5])
    expect(current.map((t) => t.sessionNumber)).toEqual([1, 1, 1, 2, 2, 2])
  })
})
