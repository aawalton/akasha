import { describe, expect, test } from "bun:test"
import { parseNextSessionFromLoaderData } from "./playing-session-chain"

const CTX = {
  loadedHref: "/story-chapter/chapter-two-bbbbbbbb",
  currentVariant: "narrator-mara",
  currentSpeed: 1.5,
}

const DETAIL = {
  kind: "detail",
  id: "chapter-2-bbbbbbbb",
  pageTypeSlug: "story-chapter",
  title: "Chapter Two",
  audioVariants: [
    { id: "narrator-mara", label: "Mara" },
    { id: "narrator-finn", label: "Finn" },
  ],
  audioNextHref: "/story-chapter/chapter-three-cccccccc",
  audioDefaultVariant: "narrator-mara",
  readerPrev: null,
  readerNext: { href: "/story-chapter/chapter-three-cccccccc", title: "Chapter Three" },
  chapterNumber: 2,
}

describe("parseNextSessionFromLoaderData", () => {
  test("builds the next session, carrying the current variant + speed", () => {
    expect(parseNextSessionFromLoaderData(DETAIL, CTX)).toEqual({
      pageId: "chapter-2-bbbbbbbb",
      pageTypeSlug: "story-chapter",
      pageHref: "/story-chapter/chapter-two-bbbbbbbb",
      title: "Chapter Two",
      medium: "audio",
      variant: "narrator-mara",
      speed: 1.5,
      nextHref: "/story-chapter/chapter-three-cccccccc",
    })
  })

  test("null title degrades to empty string", () => {
    const init = parseNextSessionFromLoaderData({ ...DETAIL, title: null }, CTX)
    expect(init?.title).toBe("")
  })

  test("returns null when the next page does not render the current variant (chain stops)", () => {
    const init = parseNextSessionFromLoaderData(
      { ...DETAIL, audioVariants: [{ id: "narrator-finn", label: "Finn" }] },
      CTX
    )
    expect(init).toBeNull()
  })

  test("returns null when the next page has no rendered audio at all", () => {
    expect(parseNextSessionFromLoaderData({ ...DETAIL, audioVariants: null }, CTX)).toBeNull()
    expect(parseNextSessionFromLoaderData({ ...DETAIL, audioVariants: [] }, CTX)).toBeNull()
  })

  test("carries a null nextHref through (end of story on the next hop)", () => {
    const init = parseNextSessionFromLoaderData({ ...DETAIL, audioNextHref: null }, CTX)
    expect(init?.nextHref).toBeNull()
  })

  test("returns null for a non-detail loader payload (e.g. a game/idle route)", () => {
    expect(parseNextSessionFromLoaderData({ kind: "idle", title: "x" }, CTX)).toBeNull()
  })

  test("returns null for malformed / missing data (defensive boundary parse)", () => {
    expect(parseNextSessionFromLoaderData(undefined, CTX)).toBeNull()
    expect(parseNextSessionFromLoaderData(null, CTX)).toBeNull()
    expect(parseNextSessionFromLoaderData({ kind: "detail" }, CTX)).toBeNull()
  })
})
