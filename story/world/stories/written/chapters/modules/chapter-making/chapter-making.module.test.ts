import { expect, test } from "bun:test"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { statusOf } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  besideStory,
  type Calls,
  chapterAfter,
  chapterMadeFor,
} from "akasha/story/world/stories/written/chapters/modules/chapter-making/chapter-making.module.code.ts"

const STORY_AT = "worlds/hotel/stories/written/hotel/hotel.story-written.ts"

const CHAPTER_AT = "worlds/hotel/stories/written/hotel/chapters/hotel-0003.story-chapter-written.ts"

test("the next chapter follows the last, at the world builder, with no prose yet", () => {
  const done = { slug: "hotel-0002", position: 2, status: "player" } as const
  const old = { slug: "hotel-0001", position: 1, status: null }
  expect(chapterAfter("hotel", [done, old])).toEqual({
    slug: "hotel-0003",
    position: 3,
    values: {
      title: "Chapter 3",
      story: "story-written/hotel",
      position: 3,
      ownLength: 0,
      unit: `${unit.slug}/${words.slug}`,
      prose: "txt",
      stepStatus: statusOf("world-builder"),
    },
  })
  expect(chapterAfter("hotel", [])).toMatchObject({ slug: "hotel-0001", position: 1 })
})

test("no chapter is started while one of the story is being made", () => {
  const making = { slug: "hotel-0002", position: 2, status: "reviewers" } as const
  expect(chapterAfter("hotel", [making])).toEqual({
    refused: "The chapter `hotel-0002` is still being made. The reviewers are working…",
  })
})

test("a chapter sits in the chapters folder beside its story", () => {
  expect(besideStory(STORY_AT, "hotel-0003")).toBe(CHAPTER_AT)
})

function callsOver(
  master: string | null,
  wrote: Writing[],
  sent: Writing[],
  editors = false
): Calls {
  const named = master === null ? { slug: "hotel" } : { slug: "hotel", coordinatorAgent: master }
  const storyRow = editors ? { ...named, editorSteps: true } : named
  return {
    ask: async (query: Query) =>
      query.pageTypeSlug === "story-written"
        ? { rows: [storyRow], n: 1 }
        : { rows: [{ slug: "hotel-0002", position: 2, stepStatus: statusOf("player") }], n: 1 },
    read: async () => ({ at: "a-commit", bodies: [{ path: STORY_AT, content: "" }], unplaced: [] }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
    send: async (asked) => {
      sent.push(asked)
      const slug = asked.pages?.[0]?.slug ?? ""
      return {
        commit: "a-commit",
        wrote: [`agent/message/pages/${slug}.agent-message.ts`],
        took: [],
      }
    },
  }
}

test("a started chapter is written as new and its story's seats are told", async () => {
  const wrote: Writing[] = []
  const sent: Writing[] = []
  const made = await chapterMadeFor("hotel", callsOver("mari-game-master-hotel", wrote, sent))
  expect(made).toMatchObject({ kind: "made", slug: "hotel-0003", at: CHAPTER_AT, faults: [] })
  expect(wrote[0]?.pages?.[0]).toMatchObject({ path: CHAPTER_AT, fresh: true })
  expect(sent.map((one) => one.pages?.[0]?.values["to"])).toEqual([
    "seat/mari-game-master-hotel",
    "seat/mari-world-builder-hotel",
    "seat/mari-writer-hotel",
  ])
  expect(sent[0]?.pages?.[0]?.values["body"]).toBe(
    `The chapter \`${CHAPTER_AT}\` is at world-builder.\n`
  )
})

test("a started chapter of a story with editor steps tells its editor seats too", async () => {
  const sent: Writing[] = []
  await chapterMadeFor("hotel", callsOver("mari-game-master-hotel", [], sent, true))
  expect(sent.map((one) => one.pages?.[0]?.values["to"])).toEqual([
    "seat/mari-game-master-hotel",
    "seat/mari-world-builder-hotel",
    "seat/mari-writer-hotel",
    "seat/mari-beat-editor-hotel",
    "seat/mari-prose-editor-hotel",
  ])
})

test("a story naming no coordinator agent starts no chapter", async () => {
  const wrote: Writing[] = []
  const made = await chapterMadeFor("hotel", callsOver(null, wrote, []))
  expect(made).toEqual({
    kind: "refused",
    said: "`hotel` names no coordinator agent to write a chapter.",
  })
  expect(wrote).toEqual([])
})
