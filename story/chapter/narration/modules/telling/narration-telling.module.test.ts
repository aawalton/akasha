import { describe, expect, test } from "bun:test"
import {
  narrationIdIs,
  nextAmong,
  pieceNameIs,
  spokenSegmentsOf,
  storyNamed,
  withSentences,
} from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"

describe("spokenSegmentsOf", () => {
  test("the title is said first, apart from the prose", () => {
    expect(spokenSegmentsOf("Chapter 81", "She ran.")).toEqual([
      { text: "Chapter 81", pauseAfterMs: 900, wordStart: 0 },
      { text: "She ran.", pauseAfterMs: 900, wordStart: 0 },
    ])
  })

  test("the title and the prose say a pronounced word as respelled", () => {
    const pronounced = [{ written: "Klbkch", spokenAs: "Kilbkich" }]
    const said = spokenSegmentsOf("Interlude – Klbkch", "Klbkch nodded.", undefined, pronounced)
    expect(said.map((one) => one.text)).toEqual(["Interlude – Kilbkich", "Kilbkich nodded."])
  })

  test("a chapter with no title starts with its prose", () => {
    expect(spokenSegmentsOf("  ", "She ran.")).toEqual([
      { text: "She ran.", pauseAfterMs: 900, wordStart: 0 },
    ])
  })

  const prose = "One two.\nThree four five.\nSix seven.\nEight nine ten."

  test("a chapter read part way starts at the sentence holding its progress, untitled", () => {
    const said = spokenSegmentsOf("Ch", prose, { ownProgress: 6, ownLength: 10 })
    expect(said.map((one) => one.text)).toEqual(["Six seven.", "Eight nine ten."])
    expect(said[0]?.wordStart).toBe(5)
  })

  test("progress inside the first segment still starts at the beginning with the title", () => {
    const said = spokenSegmentsOf("Ch", prose, { ownProgress: 1, ownLength: 10 })
    expect(said.map((one) => one.text)[0]).toBe("Ch")
  })

  test("a chapter read through, or not begun, starts at its beginning", () => {
    const whole = ["Ch", "One two.", "Three four five.", "Six seven.", "Eight nine ten."]
    for (const ownProgress of [0, 10, null]) {
      const said = spokenSegmentsOf("Ch", prose, { ownProgress, ownLength: 10 })
      expect(said.map((one) => one.text)).toEqual(whole)
    }
  })

  test("word starts are counted in the chapter's own length", () => {
    const said = spokenSegmentsOf("", prose, { ownProgress: null, ownLength: 20 })
    expect(said.map((one) => one.wordStart)).toEqual([0, 4, 10, 14])
  })
})

describe("withSentences", () => {
  test("each sentence after a segment's first starts at its character and its share of words", () => {
    const [one] = withSentences([
      { text: "One two. Three four five.", pauseAfterMs: 150, wordStart: 10 },
      { text: "Six.", pauseAfterMs: 900, wordStart: 15 },
    ])
    expect(one?.sentences).toEqual([[9, 12]])
  })

  test("a segment of one sentence, or a title, starts no sentence of its own", () => {
    const said = withSentences([
      { text: "Chapter 81", pauseAfterMs: 900, wordStart: 0 },
      { text: "She ran.", pauseAfterMs: 900, wordStart: 0 },
    ])
    expect(said.map((one) => one.sentences)).toEqual([[], []])
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
