import { describe, expect, it } from "bun:test"
import { selectNextExploration, selectNextStory, selectNowReading } from "./select"
import { selectNextChapter, selectReadAheadChapterIds, selectUnreadChapters } from "./select-internals"
import { type LitrpgCatalog, type LitrpgChapter, type LitrpgStory } from "./select-types"

function story(id: string, over: Partial<LitrpgStory> = {}): LitrpgStory {
  return { id, title: id, genres: [], ...over }
}

function chapter(id: string, storyId: string, over: Partial<LitrpgChapter> = {}): LitrpgChapter {
  return { id, title: id, storyId, ...over }
}

function catalog(
  stories: readonly LitrpgStory[],
  chapters: readonly LitrpgChapter[]
): LitrpgCatalog {
  return { stories, chapters }
}

describe("selectNextChapter", () => {
  it("returns the lowest-numbered unread chapter", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c3", "s1", { chapterNumber: 3 }),
        chapter("c1", "s1", { chapterNumber: 1, grade: "A" }),
        chapter("c2", "s1", { chapterNumber: 2 }),
      ]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c2")
  })

  it("sorts unnumbered chapters last", () => {
    const cat = catalog(
      [story("s1")],
      [chapter("cX", "s1"), chapter("c5", "s1", { chapterNumber: 5 })]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c5")
  })

  it("returns null when every chapter is read", () => {
    const cat = catalog([story("s1")], [chapter("c1", "s1", { chapterNumber: 1, grade: "B" })])
    expect(selectNextChapter(cat, "s1")).toBeNull()
  })
})

describe("selectNextChapter — completedAt-driven next-unread (#15380)", () => {
  it("skips a chapter marked fully read by completedAt presence", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", {
          chapterNumber: 1,
          length: 100,
          progress: 100,
          completedAt: "2026-07-14T00:00:00.000Z",
        }),
        chapter("c2", "s1", { chapterNumber: 2, length: 100 }),
        chapter("c3", "s1", { chapterNumber: 3, length: 100 }),
      ]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c2")
  })

  it("treats full progress WITHOUT completedAt as the resume point (not fully read)", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", { chapterNumber: 1, length: 100, progress: 100 }),
        chapter("c2", "s1", { chapterNumber: 2, length: 100 }),
      ]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c1")
  })

  it("behaves exactly as before when no chapter carries a completedAt field", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", { chapterNumber: 1, grade: "A" }),
        chapter("c2", "s1", { chapterNumber: 2 }),
        chapter("c3", "s1", { chapterNumber: 3 }),
      ]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c2")
  })

  it("skips a completed chapter regardless of length/progress", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", {
          chapterNumber: 1,
          completedAt: "2026-07-14T00:00:00.000Z",
        }),
        chapter("c2", "s1", { chapterNumber: 2 }),
      ]
    )
    expect(selectNextChapter(cat, "s1")?.id).toBe("c2")
  })
})

describe("selectUnreadChapters — the ordered unread set behind selectNextChapter (#15741)", () => {
  it("returns every unread chapter at/past the floor, in reading order", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c3", "s1", { chapterNumber: 3 }),
        chapter("c1", "s1", { chapterNumber: 1 }),
        chapter("c2", "s1", { chapterNumber: 2 }),
      ]
    )
    expect(selectUnreadChapters(cat, "s1").map((c) => c.id)).toEqual(["c1", "c2", "c3"])
  })

  it("its head is exactly selectNextChapter", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", { chapterNumber: 1, grade: "A" }),
        chapter("c2", "s1", { chapterNumber: 2 }),
        chapter("c3", "s1", { chapterNumber: 3 }),
      ]
    )
    const unread = selectUnreadChapters(cat, "s1")
    expect(unread[0]?.id).toBe(selectNextChapter(cat, "s1")?.id)
    expect(unread.map((c) => c.id)).toEqual(["c2", "c3"])
  })

  it("excludes graded and completedAt chapters", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", { chapterNumber: 1, grade: "B" }),
        chapter("c2", "s1", { chapterNumber: 2, completedAt: "2026-07-14T00:00:00.000Z" }),
        chapter("c3", "s1", { chapterNumber: 3 }),
        chapter("c4", "s1", { chapterNumber: 4 }),
      ]
    )
    expect(selectUnreadChapters(cat, "s1").map((c) => c.id)).toEqual(["c3", "c4"])
  })

  it("respects the word-bookmark resume floor", () => {
    const cat = catalog(
      [story("s1", { status: "In Progress", progress: 250, length: 500, chapterCount: 5 })],
      [1, 2, 3, 4, 5].map((n) => chapter(`c${n}`, "s1", { chapterNumber: n, length: 100 }))
    )
    expect(selectUnreadChapters(cat, "s1").map((c) => c.id)).toEqual(["c3", "c4", "c5"])
  })

  it("is empty when the story is finished", () => {
    const cat = catalog([story("s1")], [chapter("c1", "s1", { chapterNumber: 1, grade: "A" })])
    expect(selectUnreadChapters(cat, "s1")).toEqual([])
  })
})

describe("selectReadAheadChapterIds — first K unread ids (#15741)", () => {
  const cat = catalog(
    [story("s1")],
    [1, 2, 3, 4, 5].map((n) => chapter(`c${n}`, "s1", { chapterNumber: n }))
  )

  it("returns the first K unread ids in reading order", () => {
    expect(selectReadAheadChapterIds(cat, "s1", 3)).toEqual(["c1", "c2", "c3"])
  })

  it("returns fewer than K when the unread set is smaller", () => {
    expect(selectReadAheadChapterIds(cat, "s1", 100)).toEqual(["c1", "c2", "c3", "c4", "c5"])
  })

  it("returns an empty list for K = 0", () => {
    expect(selectReadAheadChapterIds(cat, "s1", 0)).toEqual([])
  })

  it("is empty for a finished story", () => {
    const done = catalog([story("s1")], [chapter("c1", "s1", { chapterNumber: 1, grade: "A" })])
    expect(selectReadAheadChapterIds(done, "s1", 30)).toEqual([])
  })
})

describe("selectNextExploration", () => {
  it("is exhausted on an empty catalog", () => {
    expect(selectNextExploration(catalog([], [])).kind).toBe("exhausted")
  })

  it("starts a new story's first chapter when nothing is in progress", () => {
    const cat = catalog(
      [story("s1", { title: "Alpha" })],
      [chapter("c1", "s1", { chapterNumber: 1 }), chapter("c2", "s1", { chapterNumber: 2 })]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("new-story")
    if (sel.kind === "new-story") expect(sel.firstChapter.id).toBe("c1")
  })

  it("continues an in-progress story before starting a new one", () => {
    const cat = catalog(
      [story("inprog"), story("fresh")],
      [
        chapter("ip1", "inprog", { chapterNumber: 1, grade: "A" }),
        chapter("ip2", "inprog", { chapterNumber: 2 }),
        chapter("f1", "fresh", { chapterNumber: 1 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") {
      expect(sel.story.id).toBe("inprog")
      expect(sel.chapter.id).toBe("ip2")
    }
  })

  it("prefers the more-loved in-progress story", () => {
    const cat = catalog(
      [story("mid"), story("loved")],
      [
        chapter("m1", "mid", { chapterNumber: 1, grade: "B" }),
        chapter("m2", "mid", { chapterNumber: 2 }),
        chapter("l1", "loved", { chapterNumber: 1, grade: "S+" }),
        chapter("l2", "loved", { chapterNumber: 2 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") expect(sel.story.id).toBe("loved")
  })

  it("orders new stories by genre adjacency to the loved set", () => {
    const cat = catalog(
      [
        story("loved", { genres: ["litrpg", "dungeon"] }),
        story("adjacent", { title: "zzz", genres: ["litrpg"] }),
        story("unrelated", { title: "aaa", genres: ["romance"] }),
      ],
      [
        chapter("lv1", "loved", { chapterNumber: 1, grade: "A" }),
        chapter("adj1", "adjacent", { chapterNumber: 1 }),
        chapter("un1", "unrelated", { chapterNumber: 1 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("new-story")
    if (sel.kind === "new-story") expect(sel.story.id).toBe("adjacent")
  })

  it("is exhausted when every readable chapter is read", () => {
    const cat = catalog([story("s1")], [chapter("c1", "s1", { chapterNumber: 1, grade: "A" })])
    expect(selectNextExploration(cat).kind).toBe("exhausted")
  })
})

describe("selectNextStory", () => {
  it("falls back to title order on a cold catalog", () => {
    const cat = catalog(
      [story("b", { title: "Beta" }), story("a", { title: "Alpha" })],
      [chapter("b1", "b", { chapterNumber: 1 }), chapter("a1", "a", { chapterNumber: 1 })]
    )
    expect(selectNextStory(cat)?.id).toBe("a")
  })
})

describe("status-driven selection (migrated reading-state)", () => {
  it("surfaces the next unread chapter of a Following story with no grades", () => {
    const cat = catalog(
      [story("s1", { status: "Following" })],
      [
        chapter("c1", "s1", { chapterNumber: 1 }),
        chapter("c2", "s1", { chapterNumber: 2 }),
        chapter("c3", "s1", { chapterNumber: 3 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") expect(sel.chapter.id).toBe("c1")
  })

  it("resumes a Following story at the chapter the word bookmark lands in", () => {
    const cat = catalog(
      [story("s1", { status: "In Progress", progress: 250, length: 500, chapterCount: 5 })],
      [1, 2, 3, 4, 5].map((n) => chapter(`c${n}`, "s1", { chapterNumber: n, length: 100 }))
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") expect(sel.chapter.id).toBe("c3")
  })

  it("excludes Completed stories from the default what-next surface", () => {
    const cat = catalog(
      [story("done", { status: "Completed" })],
      [chapter("d1", "done", { chapterNumber: 1 }), chapter("d2", "done", { chapterNumber: 2 })]
    )
    expect(selectNextExploration(cat).kind).toBe("exhausted")
    expect(selectNowReading(cat)).toBeNull()
  })

  it("excludes Archived by default but resumes it when explicitly requested", () => {
    const cat = catalog(
      [story("arch", { status: "Archived", progress: 100, length: 300, chapterCount: 3 })],
      [1, 2, 3].map((n) => chapter(`a${n}`, "arch", { chapterNumber: n, length: 100 }))
    )
    expect(selectNextExploration(cat).kind).toBe("exhausted")
    const sel = selectNextExploration(cat, { includeArchived: true })
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") expect(sel.chapter.id).toBe("a2")
  })

  it("places a Not Started story in the exploration pool", () => {
    const cat = catalog(
      [story("ip", { status: "Following" }), story("new", { status: "Not Started", title: "Aaa" })],
      [
        chapter("ip1", "ip", { chapterNumber: 1, grade: "A" }),
        chapter("new1", "new", { chapterNumber: 1 }),
      ]
    )
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("new-story")
    if (sel.kind === "new-story") expect(sel.story.id).toBe("new")
  })
})

describe("selectNowReading", () => {
  it("returns null when nothing is in progress", () => {
    const cat = catalog([story("s1")], [chapter("c1", "s1", { chapterNumber: 1 })])
    expect(selectNowReading(cat)).toBeNull()
  })

  it("reports last-read and next chapter of the in-progress story", () => {
    const cat = catalog(
      [story("s1")],
      [
        chapter("c1", "s1", { chapterNumber: 1, grade: "A" }),
        chapter("c2", "s1", { chapterNumber: 2, grade: "B" }),
        chapter("c3", "s1", { chapterNumber: 3 }),
      ]
    )
    const now = selectNowReading(cat)
    expect(now?.story.id).toBe("s1")
    expect(now?.lastRead?.id).toBe("c2")
    expect(now?.nextChapter?.id).toBe("c3")
  })
})

describe("selectNowReading — resolvable next chapter (#14066)", () => {
  it("skips a more-loved in-progress story whose next chapter resolves to null", () => {
    const cat = catalog(
      [
        story("dead", { status: "Following", grade: "S" }),
        story("alive", { status: "Following", grade: "B" }),
      ],
      [
        chapter("v1", "alive", { chapterNumber: 1, grade: "A" }),
        chapter("v2", "alive", { chapterNumber: 2 }),
      ]
    )
    const now = selectNowReading(cat)
    expect(now?.story.id).toBe("alive")
    expect(now?.nextChapter?.id).toBe("v2")
  })

  it("returns null when no in-progress story has a resolvable next chapter", () => {
    const cat = catalog([story("dead", { status: "Following" })], [])
    expect(selectNowReading(cat)).toBeNull()
  })

  it("headlines the same story `next` hands a chapter from (one coherent story)", () => {
    const cat = catalog(
      [
        story("dead", { status: "Following", grade: "S" }),
        story("mid", { status: "Following", grade: "B" }),
        story("low", { status: "In Progress", grade: "C" }),
      ],
      [chapter("m1", "mid", { chapterNumber: 1 }), chapter("l1", "low", { chapterNumber: 1 })]
    )
    const now = selectNowReading(cat)
    const sel = selectNextExploration(cat)
    expect(sel.kind).toBe("chapter-in-progress-story")
    if (sel.kind === "chapter-in-progress-story") {
      expect(now?.story.id).toBe(sel.story.id)
      expect(now?.nextChapter?.id).toBe(sel.chapter.id)
    }
  })
})
