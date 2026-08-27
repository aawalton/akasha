import { describe, expect, it } from "bun:test"
import { buildStoryCatalog } from "./catalog"
import { selectNextChapter } from "./select-internals"

function storyRow(over: Record<string, unknown> = {}): Record<string, unknown> {
  return { id: "s1", title: "Story One", genre: [], ...over }
}
function chapterRow(
  id: string,
  chapterNumber: number,
  over: Record<string, unknown> = {}
): Record<string, unknown> {
  return { id, title: id, story: "s1", chapterNumber, ...over }
}

describe("buildStoryCatalog", () => {
  it("builds a single-story scoped catalog from flat rows", () => {
    const cat = buildStoryCatalog(storyRow(), [
      chapterRow("c1", 1, { length: 100 }),
      chapterRow("c2", 2, { length: 100 }),
    ])
    expect(cat.stories).toHaveLength(1)
    expect(cat.stories[0]?.id).toBe("s1")
    expect(cat.chapters).toHaveLength(2)
    expect(cat.chapters.every((c) => c.storyId === "s1")).toBe(true)
  })

  it("yields an empty story list when the story row is null", () => {
    const cat = buildStoryCatalog(null, [chapterRow("c1", 1)])
    expect(cat.stories).toHaveLength(0)
    expect(cat.chapters).toHaveLength(1)
  })
})

describe("buildStoryCatalog + selectNextChapter (the next-unread contract)", () => {
  it("resumes at the word-bookmark floor when the story carries progress", () => {
    const cat = buildStoryCatalog(storyRow({ progress: 120, length: 300, chapterCount: 3 }), [
      chapterRow("c1", 1, { length: 100 }),
      chapterRow("c2", 2, { length: 100 }),
      chapterRow("c3", 3, { length: 100 }),
    ])
    expect(selectNextChapter(cat, "s1")?.id).toBe("c2")
  })

  it("starts at chapter 1 when the story carries no bookmark", () => {
    const cat = buildStoryCatalog(storyRow(), [
      chapterRow("c1", 1, { length: 100 }),
      chapterRow("c2", 2, { length: 100 }),
    ])
    expect(selectNextChapter(cat, "s1")?.id).toBe("c1")
  })

  it("returns null when every chapter already carries a going-forward grade", () => {
    const cat = buildStoryCatalog(storyRow(), [
      chapterRow("c1", 1, { length: 100, grade: "A" }),
      chapterRow("c2", 2, { length: 100, grade: "B+" }),
    ])
    expect(selectNextChapter(cat, "s1")).toBeNull()
  })

  it("falls back to chapter 1 when the story row is absent (floor defaults to 1)", () => {
    const cat = buildStoryCatalog(null, [chapterRow("c1", 1), chapterRow("c2", 2)])
    expect(selectNextChapter(cat, "s1")?.id).toBe("c1")
  })
})
