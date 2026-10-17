import { expect, test } from "bun:test"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { worldBuilder } from "akasha/story/chapter/step-status/pages/world-builder.step-status.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  besideChapter,
  besideTurn,
  type Calls,
  latestAsked,
  openingMadeFor,
  turnMadeFor,
} from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

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
          stepStatus: `${stepStatus.slug}/${status}`,
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
  expect(made).toEqual({ kind: "made", slug: "the-saga-00-003", at, roleplayed: false })
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
        stepStatus: `${stepStatus.slug}/world-builder`,
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

function callsRoleplayed(latest: Readonly<Record<string, unknown>>, wrote: Writing[]): Calls {
  return {
    ask: async (query) => {
      if (query.pageTypeSlug === "story-played") {
        return { rows: [{ slug: GAME, roleplayed: true }], n: 1 }
      }
      if (query.pageTypeSlug === "story-reviewer") return { rows: [{ slug: "keen-eye" }], n: 1 }
      const turn = {
        slug: "the-saga-00-002",
        position: 2,
        partOfCollections: [`story-played/${GAME}`],
        unit: WORDS,
        roleplayed: true,
        ...latest,
      }
      return { rows: [turn], n: 3 }
    },
    read: async () => ({ at: "a-commit", bodies: [{ path: HELD_AT, content: "" }], unplaced: [] }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
  }
}

test("an action in a roleplayed story makes a roleplayed turn every reviewer has passed", async () => {
  const wrote: Writing[] = []
  const latest = { stepStatus: `${stepStatus.slug}/player` }
  await turnMadeFor(GAME, "I open the gate", callsRoleplayed(latest, wrote))
  expect(wrote[0]?.pages?.[0]?.values).toMatchObject({
    roleplayed: true,
    reviewedBy: ["story-reviewer/keen-eye"],
  })
})

test("a roleplayed turn whose prose landed is followed before it reaches player", async () => {
  const wrote: Writing[] = []
  const latest = { stepStatus: `${stepStatus.slug}/game-master`, prose: "txt" }
  const made = await turnMadeFor(GAME, "I open the gate", callsRoleplayed(latest, wrote))
  expect(made).toMatchObject({ kind: "made", slug: "the-saga-00-003", roleplayed: true })
})

test("a roleplayed turn with no prose yet is not followed", async () => {
  const wrote: Writing[] = []
  const latest = { stepStatus: `${stepStatus.slug}/world-builder` }
  const made = await turnMadeFor(GAME, "I open the gate", callsRoleplayed(latest, wrote))
  expect(made).toMatchObject({ kind: "refused" })
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
  expect(made).toEqual({ kind: "made", slug: "the-saga-00-050", at, roleplayed: false })
  expect(wrote[0]?.pages?.[0]?.values).toEqual({
    partOfCollections: [`story-played/${GAME}`],
    position: 50,
    unit: WORDS,
    stepStatus: `${stepStatus.slug}/world-builder`,
    action: "I open the gate",
  })
})

test("a turn after a chapter sits in the turns folder beside the story's chapters", () => {
  expect(besideChapter(CHAPTER_AT, "the-saga-00-050")).toBe(
    "stories/the-saga/turns/the-saga-00-050.story-turn-played.ts"
  )
})

const STORY_AT = "stories/the-saga/the-saga.story-played.ts"

const OPENER = "a narrator <narrator@alanwalton.com>"

const KEEN_EYE = "keen-eye"

type Values = Readonly<Record<string, unknown>>

function callsUnopened(story: Values | null, turns: readonly Values[], wrote: Writing[]): Calls {
  return {
    ask: async (query) => {
      if (query.pageTypeSlug === storyPlayed.slug) {
        return story === null ? { rows: [], n: 0 } : { rows: [story], n: 1 }
      }
      if (query.pageTypeSlug === storyReviewer.slug) return { rows: [{ slug: KEEN_EYE }], n: 1 }
      if (query.pageTypeSlug === storyTurnPlayed.slug) return { rows: [...turns], n: turns.length }
      return { rows: [], n: 0 }
    },
    read: async () => ({ at: "a-commit", bodies: [{ path: STORY_AT, content: "" }], unplaced: [] }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
  }
}

const ROLEPLAYED_STORY = { slug: GAME, roleplayed: true, unit: WORDS }

test("a roleplayed story with no turn opens at world-builder with no action", async () => {
  const wrote: Writing[] = []
  const made = await openingMadeFor(GAME, OPENER, callsUnopened(ROLEPLAYED_STORY, [], wrote))
  const at = `stories/the-saga/turns/the-saga-00-001.${storyTurnPlayed.slug}.ts`
  expect(made).toEqual({ kind: "made", slug: "the-saga-00-001", at, roleplayed: true })
  expect(wrote[0]?.writer).toBe(OPENER)
  expect(wrote[0]?.pages).toEqual([
    {
      pageTypeSlug: storyTurnPlayed.slug,
      slug: "the-saga-00-001",
      path: at,
      fresh: true,
      values: {
        partOfCollections: [`${storyPlayed.slug}/${GAME}`],
        position: 1,
        unit: WORDS,
        stepStatus: `${stepStatus.slug}/${worldBuilder.slug}`,
        roleplayed: true,
        reviewedBy: [`${storyReviewer.slug}/${KEEN_EYE}`],
      },
    },
  ])
})

test("a story with a turn already is not opened again", async () => {
  const wrote: Writing[] = []
  const turn = { slug: "the-saga-00-001", position: 1 }
  const calls = callsUnopened(ROLEPLAYED_STORY, [turn], wrote)
  expect(await openingMadeFor(GAME, OPENER, calls)).toMatchObject({ kind: "refused" })
  expect(wrote).toEqual([])
})

test("a story not roleplayed is not opened with no action", async () => {
  const wrote: Writing[] = []
  const calls = callsUnopened({ slug: GAME, unit: WORDS }, [], wrote)
  expect(await openingMadeFor(GAME, OPENER, calls)).toMatchObject({ kind: "refused" })
  expect(wrote).toEqual([])
})

test("a story nowhere is not opened", async () => {
  const wrote: Writing[] = []
  const calls = callsUnopened(null, [], wrote)
  expect(await openingMadeFor(GAME, OPENER, calls)).toMatchObject({ kind: "refused" })
  expect(wrote).toEqual([])
})

test("a turn's page sits in the folder of the turn before it", () => {
  expect(besideTurn("a/b/turns/x-00-001.story-turn-played.ts", "x-00-002")).toBe(
    "a/b/turns/x-00-002.story-turn-played.ts"
  )
})
