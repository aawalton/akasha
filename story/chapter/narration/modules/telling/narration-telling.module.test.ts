import { describe, expect, test } from "bun:test"
import {
  narrationIdIs,
  nextAmong,
  pieceNameIs,
  spokenSegmentsOf,
  storyNamed,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"

describe("spokenSegmentsOf", () => {
  test("the title is said first, apart from the prose", () => {
    expect(spokenSegmentsOf("Chapter 81", "She ran.")).toEqual([
      { text: "Chapter 81", pauseAfterMs: 900 },
      { text: "She ran.", pauseAfterMs: 900 },
    ])
  })

  test("a chapter with no title starts with its prose", () => {
    expect(spokenSegmentsOf("  ", "She ran.")).toEqual([{ text: "She ran.", pauseAfterMs: 900 }])
  })
})

describe("nextAmong", () => {
  test("the next chapter is the nearest one after the chapter playing", () => {
    const rows = [
      { slug: "c-5", position: 5 },
      { slug: "c-3", position: 3 },
      { slug: "c-4", position: 4 },
    ]
    expect(nextAmong(rows, 2)?.slug).toBe("c-3")
  })

  test("a chapter with no position is never the next one", () => {
    const rows = [{ slug: "everything-unread" }, { slug: "c-9", position: 9 }]
    expect(nextAmong(rows, 8)?.slug).toBe("c-9")
  })

  test("the last chapter has no next one", () => {
    expect(nextAmong([{ slug: "c-1", position: 1 }], 1)).toBeNull()
  })
})

describe("storyNamed", () => {
  test("a story's address names its page type and its slug", () => {
    expect(storyNamed("shelf/tale")).toEqual({ pageTypeSlug: "shelf", slug: "tale" })
  })

  test("an address with no page type names no story", () => {
    expect(storyNamed("gifted")).toBeNull()
  })
})

describe("names reaching the speech workload", () => {
  test("a narration id is a short run of url-safe characters", () => {
    expect(narrationIdIs("Ab3_x-9QzLmN0pQr")).toBe(true)
    expect(narrationIdIs("../etc")).toBe(false)
  })

  test("only the playlist, the chapters, the init section and the pieces pass through", () => {
    expect(["playlist.m3u8", "chapters", "init.mp4", "p00012.m4s"].every(pieceNameIs)).toBe(true)
    expect(["health", "p1.ts", "../x", "playlist.m3u8x"].some(pieceNameIs)).toBe(false)
  })
})
