import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import type { Calls } from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"

export const GAME = "the-saga"

export const WORDS = `${unit.slug}/${words.slug}`

export const HELD_AT = "stories/the-saga/turns/the-saga-00-002.story-turn-played.ts"

type Values = Readonly<Record<string, unknown>>

function writtenTo(wrote: Writing[]): Calls["write"] {
  return async (asked) => {
    wrote.push(asked)
    return { commit: "a-commit", wrote: [], took: [] }
  }
}

const held: Calls["read"] = async () => ({
  at: "a-commit",
  bodies: [{ path: HELD_AT, content: "" }],
  unplaced: [],
})

export function callsOver(status: string, wrote: Writing[]): Calls {
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
    read: held,
    write: writtenTo(wrote),
  }
}

export function callsFlowing(rows: readonly Values[], wrote: Writing[]): Calls {
  return {
    ask: async () => ({ rows: [...rows], n: rows.length }),
    read: held,
    write: writtenTo(wrote),
  }
}

export const turnRow = (position: number, status: string, more: Values = {}) => ({
  slug: `the-saga-00-00${position}`,
  position,
  partOfCollections: [`story-played/${GAME}`],
  stepStatus: `${stepStatus.slug}/${status}`,
  ...more,
})

export function callsRoleplayed(latest: Values, wrote: Writing[]): Calls {
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
    read: held,
    write: writtenTo(wrote),
  }
}
