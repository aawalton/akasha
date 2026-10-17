import { expect, test } from "bun:test"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { story } from "akasha/command/argument/pages/story.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyTurnOpen } from "akasha/command/pages/story/turn/open/story-turn-open.command.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import type { Calls } from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"

const GAME = "the-saga"

const SEAT = "a narrator <narrator@alanwalton.com>"

const GIVEN: Given = { root: ".", calledAs: "open", from: ".", writer: SEAT, agentId: null }

function callsOver(roleplayed: boolean, wrote: Writing[]): Calls {
  return {
    ask: async (query) =>
      query.pageTypeSlug === storyPlayed.slug
        ? { rows: [{ slug: GAME, roleplayed, unit: `${unit.slug}/${words.slug}` }], n: 1 }
        : { rows: [], n: 0 },
    read: async () => ({
      at: "a-commit",
      bodies: [{ path: `stories/${GAME}/${GAME}.${storyPlayed.slug}.ts`, content: "" }],
      unplaced: [],
    }),
    write: async (asked) => {
      wrote.push(asked)
      return { commit: "a-commit", wrote: [], took: [] }
    },
  }
}

test("an open writes the story's opening as the calling seat and says where", async () => {
  const wrote: Writing[] = []
  const answer = await storyTurnOpen([story.said, GAME], GIVEN, callsOver(true, wrote))
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toStartWith(`opened\t${GAME}-00-001\t`)
  expect(wrote[0]?.writer).toBe(SEAT)
})

test("an open of a story not roleplayed is refused and writes nothing", async () => {
  const wrote: Writing[] = []
  const answer = await storyTurnOpen([story.said, GAME], GIVEN, callsOver(false, wrote))
  expect(answer.refusals.length).toBe(1)
  expect(wrote).toEqual([])
})

test("an open naming no story is refused", async () => {
  const answer = await storyTurnOpen([], GIVEN, callsOver(true, []))
  expect(answer.refusals.length).toBeGreaterThan(0)
})
