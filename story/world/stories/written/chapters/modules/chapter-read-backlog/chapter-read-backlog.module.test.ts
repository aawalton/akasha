import { expect, test } from "bun:test"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  chapterReadBacklog,
  chapterReadIn,
} from "akasha/story/world/stories/written/chapters/modules/chapter-read-backlog/chapter-read-backlog.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const ID = "01a0f000-0000-7000-8000-000000000001"

const OF_TALE = { story: `${storyWritten.slug}/tale` }

const DONE = { completedAt: "2026-10-03T00:00:00.000Z", ownProgress: 3000 }

function patched(more: Record<string, unknown>) {
  return {
    op: "patchPage",
    args: { pageTypeSlug: "story-chapter-written", where: [{ key: "id", eq: ID }], set: DONE },
    ...more,
  }
}

test("a patch stating a written chapter's completed moment names that chapter", () => {
  expect(chapterReadIn(patched({}))).toBe(ID)
  const byId = {
    op: "patchPageById",
    args: { pageTypeSlug: "story-chapter-written", id: ID, set: DONE },
  }
  expect(chapterReadIn(byId)).toBe(ID)
})

test("a write that reads no written chapter names none", () => {
  const unread = { completedAt: null, ownProgress: 0 }
  const args = patched({}).args
  expect(chapterReadIn(patched({ args: { ...args, set: unread } }))).toBeNull()
  expect(
    chapterReadIn(patched({ args: { ...args, pageTypeSlug: "story-chapter-read" } }))
  ).toBeNull()
  expect(chapterReadIn(patched({ op: "createPage" }))).toBeNull()
  expect(chapterReadIn(null)).toBeNull()
})

test("a chapter read runs the backlog rule for its own story", async () => {
  const asked: Query[] = []
  const kept: string[] = []
  const said = await chapterReadBacklog(
    ID,
    (query) => {
      asked.push(query)
      return Promise.resolve({ rows: [OF_TALE], n: 1 })
    },
    (story) => {
      kept.push(story)
      return Promise.resolve({ said: `${story}\twould write`, failed: false, faults: [] })
    }
  )
  expect(asked[0]?.where).toEqual({ id: { is: ID } })
  expect(kept).toEqual(["tale"])
  expect(said.said).toBe("tale\twould write")
})

test("a rule run that throws is said as failed", async () => {
  const said = await chapterReadBacklog(
    ID,
    () => Promise.resolve({ rows: [OF_TALE], n: 1 }),
    () => Promise.reject(new Error("away"))
  )
  expect(said.failed).toBe(true)
  expect(said.said).toContain("away")
})
