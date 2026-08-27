import { describe, expect, it } from "bun:test"
import { type ChapterLength, resolveResumeChapter } from "./translate"

const chapters = (counts: readonly number[]): readonly ChapterLength[] =>
  counts.map((length, i) => ({ chapterNumber: i + 1, length }))

describe("resolveResumeChapter", () => {
  it("starts at the first chapter when there is no bookmark", () => {
    expect(resolveResumeChapter({ chapters: chapters([100, 100, 100]) })).toBe(1)
    expect(resolveResumeChapter({ chapters: chapters([100, 100]), bookmarkWords: 0 })).toBe(1)
  })

  it("returns the chapter the word bookmark lands inside (real counts)", () => {
    const cs = chapters([100, 100, 100, 100, 100])
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 50 })).toBe(1)
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 100 })).toBe(2)
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 250 })).toBe(3)
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 399 })).toBe(4)
  })

  it("returns null when the bookmark is at or past the end (real counts)", () => {
    const cs = chapters([100, 100, 100])
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 300 })).toBeNull()
    expect(resolveResumeChapter({ chapters: cs, bookmarkWords: 5000 })).toBeNull()
  })

  it("walks chapters out of order (sorts by chapterNumber first)", () => {
    const unordered: ChapterLength[] = [
      { chapterNumber: 3, length: 100 },
      { chapterNumber: 1, length: 100 },
      { chapterNumber: 2, length: 100 },
    ]
    expect(resolveResumeChapter({ chapters: unordered, bookmarkWords: 150 })).toBe(2)
  })

  it("falls back to a proportional split when no real per-chapter counts exist", () => {
    const cs: ChapterLength[] = Array.from({ length: 10 }, (_, i) => ({ chapterNumber: i + 1 }))
    expect(
      resolveResumeChapter({ chapters: cs, bookmarkWords: 250, totalWords: 1000, chapterCount: 10 })
    ).toBe(3)
  })

  it("proportional fallback returns null when the bookmark clears the total", () => {
    const cs: ChapterLength[] = Array.from({ length: 5 }, (_, i) => ({ chapterNumber: i + 1 }))
    expect(
      resolveResumeChapter({ chapters: cs, bookmarkWords: 1000, totalWords: 1000, chapterCount: 5 })
    ).toBeNull()
  })

  it("returns null when there is no basis to translate (no chapters, no total)", () => {
    expect(resolveResumeChapter({ chapters: [], bookmarkWords: 100 })).toBeNull()
  })
})
