import { expect, test } from "bun:test"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  besideChapter,
  besideTurn,
  type Calls,
  latestAsked,
  turnMadeFor,
} from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

const GAME = "the-saga"

const WORDS = `${unit.slug}/${words.slug}`

const HELD_AT = "stories/the-saga/turns/the-saga-00-002.story-turn-played.ts"

function callsOver(status: string, wrote: Writing[]): Calls {
  return {
    ask: async () => ({
      rows: [
        {
          slug: "the-saga-00-002",
          position: 2,
          partOfCollections: [`story-played/${GAME}`],
          unit: WORDS,
          turnStatus: `${turnStatus.slug}/${status}`,
        },
      ],
      n: 3,
    }),
    read: async () => ({ at: "a-commit", bodies: [{ path: HELD_AT, content: "" }], unplaced: [] }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
  }
}

test("the story's latest turn is asked for by its place among the story's turns", () => {
  expect(latestAsked(GAME)).toMatchObject({
    where: { partOfCollections: { has: `story-played/${GAME}` } },
    sortBy: "position",
    descending: true,
    limit: 1,
  })
})

test("an action writes the next turn as new, beside the turn before it", async () => {
  const wrote: Writing[] = []
  const made = await turnMadeFor(GAME, "I open the gate", callsOver("player", wrote))
  const at = "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts"
  expect(made).toEqual({ kind: "made", slug: "the-saga-00-003", at })
  expect(wrote[0]?.pages).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: "the-saga-00-003",
      path: at,
      fresh: true,
      values: {
        partOfCollections: [`story-played/${GAME}`],
        position: 3,
        unit: WORDS,
        turnStatus: `${turnStatus.slug}/world-builder`,
        action: "I open the gate",
      },
    },
  ])
})

test("an action while the last turn is being made writes nothing", async () => {
  const wrote: Writing[] = []
  const made = await turnMadeFor(GAME, "I open the gate", callsOver("writer", wrote))
  expect(made).toEqual({
    kind: "refused",
    said: "The last turn is still being made: the writer is working on it.",
  })
  expect(wrote).toEqual([])
})

const CHAPTER_AT = "stories/the-saga/chapters/the-saga-0001-the-gate.story-chapter-played.ts"

function callsAfterChapter(wrote: Writing[]): Calls {
  return {
    ask: async (query) =>
      query.pageTypeSlug === "story-turn-played"
        ? { rows: [], n: 0 }
        : {
            rows: [
              {
                slug: "the-saga-0001-the-gate",
                position: 1,
                unit: WORDS,
                lastTurn: "the-saga-00-049",
                lastTurnPosition: 49,
              },
            ],
            n: 1,
          },
    read: async () => ({
      at: "a-commit",
      bodies: [{ path: CHAPTER_AT, content: "" }],
      unplaced: [],
    }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
  }
}

test("a story whose turns a chapter all took makes its next turn after the chapter's last turn", async () => {
  const wrote: Writing[] = []
  const made = await turnMadeFor(GAME, "I open the gate", callsAfterChapter(wrote))
  const at = "stories/the-saga/turns/the-saga-00-050.story-turn-played.ts"
  expect(made).toEqual({ kind: "made", slug: "the-saga-00-050", at })
  expect(wrote[0]?.pages?.[0]?.values).toEqual({
    partOfCollections: [`story-played/${GAME}`],
    position: 50,
    unit: WORDS,
    turnStatus: `${turnStatus.slug}/world-builder`,
    action: "I open the gate",
  })
})

test("a turn after a chapter sits in the turns folder beside the story's chapters", () => {
  expect(besideChapter(CHAPTER_AT, "the-saga-00-050")).toBe(
    "stories/the-saga/turns/the-saga-00-050.story-turn-played.ts"
  )
})

test("a turn's page sits in the folder of the turn before it", () => {
  expect(besideTurn("a/b/turns/x-00-001.story-turn-played.ts", "x-00-002")).toBe(
    "a/b/turns/x-00-002.story-turn-played.ts"
  )
})
