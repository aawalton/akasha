import { describe, expect, test } from "bun:test"
import {
  CHAPTER_PROSE_PAST_TURNS_DEFAULT,
  CHAPTER_PROSE_TITLES_DEFAULT,
  ChapterProseDefaultsSchema,
  resolveChapterProseDials,
} from "./display-defaults"

describe("ChapterProseDefaultsSchema — strict dial pair", () => {
  test("both dials parse", () => {
    expect(ChapterProseDefaultsSchema.parse({ titles: "hidden", pastTurns: "muted" })).toEqual({
      titles: "hidden",
      pastTurns: "muted",
    })
  })

  test("an empty dial pair is valid — every dial falls through to the default", () => {
    expect(ChapterProseDefaultsSchema.parse({})).toEqual({})
  })

  test("an unknown dial is rejected", () => {
    expect(() => ChapterProseDefaultsSchema.parse({ history: "full" })).toThrow()
  })

  test("an out-of-enum dial value is rejected", () => {
    expect(() => ChapterProseDefaultsSchema.parse({ titles: "faint" })).toThrow()
  })
})

describe("the compiled defaults are the whole of what stands below a game's own declaration", () => {
  test("titles reads shown and pastTurns reads plain", () => {
    expect(CHAPTER_PROSE_TITLES_DEFAULT).toBe("shown")
    expect(CHAPTER_PROSE_PAST_TURNS_DEFAULT).toBe("plain")
  })
})

describe("resolveChapterProseDials — declared, then the compiled default", () => {
  test("a game's own dials win over the default", () => {
    expect(resolveChapterProseDials({ titles: "hidden", pastTurns: "muted" })).toEqual({
      titles: "hidden",
      pastTurns: "muted",
    })
  })

  test("no declared module at all reads as the compiled default", () => {
    expect(resolveChapterProseDials(undefined)).toEqual({ titles: "shown", pastTurns: "plain" })
  })

  test("an empty declared module reads as the compiled default", () => {
    expect(resolveChapterProseDials({})).toEqual({ titles: "shown", pastTurns: "plain" })
  })

  test("declared titles stands while pastTurns falls to the default", () => {
    expect(resolveChapterProseDials({ titles: "hidden" })).toEqual({
      titles: "hidden",
      pastTurns: "plain",
    })
  })

  test("declared pastTurns stands while titles falls to the default", () => {
    expect(resolveChapterProseDials({ pastTurns: "muted" })).toEqual({
      titles: "shown",
      pastTurns: "muted",
    })
  })
})
