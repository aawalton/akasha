import { describe, expect, test } from "bun:test"
import { buildPageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import {
  composeStorySession,
  PUBLISHED_TURN_STATUSES,
  pickLatestPublishedSnapshot,
} from "./story-session-compose.module.code.ts"

const row = (overrides: Record<string, unknown>): Record<string, unknown> => ({
  id: "r1",
  title: "A Turn",
  slug: null,
  turnNumber: 0,
  status: "published",
  text: "prose",
  sessionNumber: 1,
  ...overrides,
})

const hrefFor = (r: Record<string, unknown>, base: string | null): string => {
  const title = typeof r.title === "string" ? r.title : "Untitled"
  const param = buildPageHrefParam({
    pageTypeSlug: toPageTypeSlug("game-turn"),
    slug: typeof r.slug === "string" ? r.slug : null,
    fallbackSlugSource: title,
    id: String(r.id),
  })
  return `${base ?? ""}/game-turn/${param}`
}

describe("PUBLISHED_TURN_STATUSES", () => {
  test("holds every turn status but the draft", () => {
    expect([...PUBLISHED_TURN_STATUSES]).toEqual(["complete", "published"])
  })
})

describe("composeStorySession", () => {
  test("keeps only this session's turns by default", () => {
    const rows = [row({ id: "a", sessionNumber: 1 }), row({ id: "b", sessionNumber: 2 })]
    const out = composeStorySession({ rows, currentSession: 2, readerBaseUrl: null })
    expect(out.current.map((t) => t.id)).toEqual(["b"])
  })

  test("keeps every session's turns and stamps them where history is full", () => {
    const rows = [row({ id: "a", sessionNumber: 1 }), row({ id: "b", sessionNumber: 2 })]
    const out = composeStorySession({
      rows,
      currentSession: 2,
      readerBaseUrl: null,
      history: "full",
    })
    expect(out.current.map((t) => [t.id, t.sessionNumber])).toEqual([
      ["a", 1],
      ["b", 2],
    ])
  })

  test("leaves the session number off a turn where history is this session only", () => {
    const out = composeStorySession({ rows: [row({})], currentSession: 1, readerBaseUrl: null })
    expect(out.current[0]?.sessionNumber).toBeUndefined()
  })

  test("drops a draft row and a row with no string id", () => {
    const rows = [row({ id: "a", status: "draft" }), row({ id: 7 }), row({ id: "c" })]
    const out = composeStorySession({ rows, currentSession: 1, readerBaseUrl: null })
    expect(out.current.map((t) => t.id)).toEqual(["c"])
  })

  test("counts a row with no status at all as published", () => {
    const out = composeStorySession({
      rows: [row({ id: "a", status: undefined })],
      currentSession: 1,
      readerBaseUrl: null,
    })
    expect(out.current.map((t) => t.id)).toEqual(["a"])
  })

  test("falls back to Untitled and empty prose", () => {
    const out = composeStorySession({
      rows: [row({ title: 3, text: null })],
      currentSession: 1,
      readerBaseUrl: null,
    })
    expect(out.current[0]).toMatchObject({ title: "Untitled", text: "" })
  })

  test("marks a turn read to the end where it was completed", () => {
    const out = composeStorySession({
      rows: [row({ id: "a", completedAt: "2024-01-01" }), row({ id: "b" })],
      currentSession: 1,
      readerBaseUrl: null,
    })
    expect(out.current.map((t) => t.fullyRead)).toEqual([true, undefined])
  })

  test("makes one chapter link per earlier session, at that session's first turn", () => {
    const rows = [
      row({ id: "s2a", sessionNumber: 2 }),
      row({ id: "s2b", sessionNumber: 2 }),
      row({ id: "s1a", sessionNumber: 1 }),
      row({ id: "now", sessionNumber: 3 }),
    ]
    const out = composeStorySession({ rows, currentSession: 3, readerBaseUrl: null })
    expect(out.chapters.map((c) => [c.id, c.title, c.chapterNumber])).toEqual([
      ["s1a", "Session 1", 1],
      ["s2a", "Session 2", 2],
    ])
  })

  test("hangs a chapter link off the reader base url", () => {
    const earlier = row({ id: "s1a", sessionNumber: 1, title: "The Salt Road" })
    const out = composeStorySession({
      rows: [earlier, row({ id: "now", sessionNumber: 2 })],
      currentSession: 2,
      readerBaseUrl: "https://reader.example",
    })
    expect(out.chapters[0]?.href).toBe(hrefFor(earlier, "https://reader.example"))
  })

  test("takes the current session for a row naming no session", () => {
    const out = composeStorySession({
      rows: [row({ id: "a", sessionNumber: null })],
      currentSession: 5,
      readerBaseUrl: null,
    })
    expect(out.current.map((t) => t.id)).toEqual(["a"])
    expect(out.chapters).toEqual([])
  })
})

describe("pickLatestPublishedSnapshot", () => {
  test("is null where no row is published", () => {
    expect(pickLatestPublishedSnapshot([row({ status: "draft" })])).toBeNull()
  })

  test("takes the last published row's sheet snapshot", () => {
    const rows = [
      row({ id: "a", sheetSnapshot: { name: "Old" } }),
      row({ id: "b", sheetSnapshot: { name: "New" } }),
      row({ id: "c", status: "draft", sheetSnapshot: { name: "Draft" } }),
    ]
    expect(pickLatestPublishedSnapshot(rows)).toEqual({ name: "New" })
  })

  test("is null where the snapshot is an array", () => {
    expect(pickLatestPublishedSnapshot([row({ sheetSnapshot: [1, 2] })])).toBeNull()
  })

  test("is null where the row carries no snapshot", () => {
    expect(pickLatestPublishedSnapshot([row({})])).toBeNull()
  })
})
