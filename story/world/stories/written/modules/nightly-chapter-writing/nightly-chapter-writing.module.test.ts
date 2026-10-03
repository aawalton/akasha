import { expect, test } from "bun:test"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { ChapterMade } from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"
import {
  backlogKept,
  type Chapter,
  dueFor,
  nightlyChapterWriting,
  type Story,
} from "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts"

const FOLLOWED: Story = { slug: "tale", following: true, master: "gm-tale", wordBacklog: null }

const READ: Chapter = { slug: "tale-0001", status: "player", completed: true, remaining: 0 }

const NOTHING_UNREAD = { due: true, why: "0 unread words, at most the word backlog of 0" }

function unreadOf(...words: number[]): Chapter[] {
  return words.map(
    (remaining, at): Chapter => ({
      slug: `tale-000${at + 2}`,
      status: "player",
      completed: false,
      remaining,
    })
  )
}

test("a story with fewer unread words than its word backlog is due", () => {
  expect(dueFor({ ...FOLLOWED, wordBacklog: 10000 }, [READ, ...unreadOf(3000, 4000)])).toEqual({
    due: true,
    why: "7000 unread words, at most the word backlog of 10000",
  })
})

test("a story with more unread words than its word backlog is not due", () => {
  expect(dueFor({ ...FOLLOWED, wordBacklog: 5000 }, [READ, ...unreadOf(3000, 4000)])).toEqual({
    due: false,
    why: "7000 unread words, over the word backlog of 5000: tale-0002, tale-0003",
  })
})

test("a story below its word backlog with a chapter mid-step is not due", () => {
  const busy: Chapter = { slug: "tale-0004", status: "writer", completed: false, remaining: 0 }
  expect(dueFor({ ...FOLLOWED, wordBacklog: 50000 }, [READ, ...unreadOf(10), busy])).toEqual({
    due: false,
    why: "`tale-0004` is mid-step at writer",
  })
})

test("a story stating no word backlog is due only with nothing unread", () => {
  expect(dueFor(FOLLOWED, [READ, ...unreadOf(3000)])).toEqual({
    due: false,
    why: "3000 unread words, over the word backlog of 0: tale-0002",
  })
  expect(dueFor(FOLLOWED, [READ])).toEqual(NOTHING_UNREAD)
})

test("a followed story with no chapter is due", () => {
  expect(dueFor(FOLLOWED, [])).toEqual(NOTHING_UNREAD)
})

test("a legacy chapter stating no step status counts as published", () => {
  const legacy: Chapter = { slug: "tale-0001", status: null, completed: false, remaining: 500 }
  expect(dueFor(FOLLOWED, [legacy]).due).toBe(false)
})

test("a story not followed is not due", () => {
  expect(dueFor({ ...FOLLOWED, following: false }, [READ])).toEqual({
    due: false,
    why: "not followed",
  })
})

test("a story naming no coordinator agent is not due", () => {
  expect(dueFor({ ...FOLLOWED, master: null }, [READ])).toEqual({
    due: false,
    why: "names no coordinator agent",
  })
})

test("a story with a chapter mid-step is not due", () => {
  const busy: Chapter = { slug: "tale-0002", status: "writer", completed: false, remaining: 0 }
  expect(dueFor(FOLLOWED, [READ, busy])).toEqual({
    due: false,
    why: "`tale-0002` is mid-step at writer",
  })
})

function asking(stories: readonly Record<string, unknown>[], chapters: readonly Chapter[]) {
  return (query: Query) =>
    Promise.resolve(
      query.pageTypeSlug === "story-written"
        ? { rows: stories, n: stories.length }
        : {
            rows: chapters.map((one) => ({
              slug: one.slug,
              stepStatus: one.status === null ? undefined : `step-status/${one.status}`,
              completedAt: one.completed ? "2026-09-28T00:00:00.000Z" : undefined,
              ownRemaining: one.remaining,
            })),
            n: chapters.length,
          }
    )
}

const STORY_ROW = { slug: "tale", following: true, coordinatorAgent: "gm-tale" }

test("a dry run says a due story would be written and starts nothing", async () => {
  const made: string[] = []
  const said = await nightlyChapterWriting(true, asking([STORY_ROW], [READ]), (story) => {
    made.push(story)
    return Promise.resolve({ kind: "refused", said: "never" })
  })
  expect(said).toEqual([`tale\twould write\t${NOTHING_UNREAD.why}`])
  expect(made).toEqual([])
})

test("a run starts the next chapter of a due story through the chapter-making module", async () => {
  const made: string[] = []
  const said = await nightlyChapterWriting(false, asking([STORY_ROW], [READ]), (story) => {
    made.push(story)
    const chapter: ChapterMade = {
      kind: "made",
      slug: "tale-0002",
      at: "tale/chapters/tale-0002.story-chapter-written.ts",
      told: [],
      faults: [],
    }
    return Promise.resolve(chapter)
  })
  expect(made).toEqual(["tale"])
  expect(said).toEqual([
    "tale\tstarted\ttale-0002\ttale/chapters/tale-0002.story-chapter-written.ts",
  ])
})

test("a story skipped is said with why", async () => {
  const unread: Chapter = { ...READ, completed: false, remaining: 40 }
  const said = await nightlyChapterWriting(false, asking([STORY_ROW], [unread]))
  expect(said).toEqual(["tale\tskipped\t40 unread words, over the word backlog of 0: tale-0001"])
})

test("a partly read chapter counts only the words it has left, and never fewer than none", async () => {
  const row = { ...STORY_ROW, wordBacklog: 1200 }
  const partly = unreadOf(1200, -300)
  const kept = await backlogKept("tale", true, asking([row], [READ, ...partly]))
  expect(kept.said).toBe("tale\twould write\t1200 unread words, at most the word backlog of 1200")
})

test("one story at most at the word backlog it states has its next chapter started", async () => {
  const made: string[] = []
  const row = { ...STORY_ROW, wordBacklog: 7000 }
  const chapters = [READ, ...unreadOf(3000, 4000)]
  const kept = await backlogKept("tale", false, asking([row], chapters), (story) => {
    made.push(story)
    return Promise.resolve({ kind: "made", slug: "tale-0004", at: "x", told: [], faults: ["f"] })
  })
  expect(made).toEqual(["tale"])
  expect(kept).toEqual({ said: "tale\tstarted\ttale-0004\tx", failed: false, faults: ["f"] })
})

test("one story whose chapter cannot be started is a failure", async () => {
  const kept = await backlogKept("tale", false, asking([STORY_ROW], [READ]), () =>
    Promise.resolve({ kind: "unread", why: "the pages were away" })
  )
  expect(kept).toEqual({ said: "tale\tfailed\tthe pages were away", failed: true, faults: [] })
})

test("a story named nowhere is a failure rather than a skip", async () => {
  const kept = await backlogKept("other", false, asking([STORY_ROW], [READ]))
  expect(kept.failed).toBe(true)
})
