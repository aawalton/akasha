import { expect, test } from "bun:test"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { ChapterMade } from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"
import {
  type Chapter,
  dueFor,
  nightlyChapterWriting,
  type Story,
} from "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts"

const FOLLOWED: Story = { slug: "tale", following: true, master: "gm-tale" }

const READ: Chapter = { slug: "tale-0001", status: "player", completed: true }

test("a followed story with every published chapter read is due", () => {
  expect(dueFor(FOLLOWED, [READ])).toEqual({ due: true })
})

test("a followed story with no chapter is due", () => {
  expect(dueFor(FOLLOWED, [])).toEqual({ due: true })
})

test("a legacy chapter stating no step status counts as published", () => {
  expect(dueFor(FOLLOWED, [{ slug: "tale-0001", status: null, completed: false }])).toEqual({
    due: false,
    why: "unread: tale-0001",
  })
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
  const busy: Chapter = { slug: "tale-0002", status: "writer", completed: false }
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
  expect(said).toEqual(["tale\twould write"])
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
  const unread: Chapter = { ...READ, completed: false }
  const said = await nightlyChapterWriting(false, asking([STORY_ROW], [unread]))
  expect(said).toEqual(["tale\tskipped\tunread: tale-0001"])
})
