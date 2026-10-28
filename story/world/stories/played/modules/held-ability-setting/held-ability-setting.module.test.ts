import { expect, test } from "bun:test"
import type { Query, Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  type Calls,
  heldAbilitySet,
} from "akasha/story/world/stories/played/modules/held-ability-setting/held-ability-setting.module.code.ts"
import {
  GAME_MASTER,
  PLAYER,
  statusOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const GAME = "the-game"

const HELD = "character-skill/the-game-nala-path-of-counting"

const BASIC = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const FIRST_BEAT = '{"beat":1,"event":"She counts to twelve."}\n'

type Held = {
  readonly turn: Row
  readonly held: Row
  readonly player: Row
  readonly mine: readonly Row[]
}

const COUNTING: Row = {
  slug: "path-of-counting",
  title: "Path of Counting",
  abilityKind: "world-ability-kind/path",
  tierSteps: BASIC,
}

const PATH: Row = { slug: "path", title: "Path", pluralTitle: "Paths", activeSlots: 10 }

function heldRow(slug: string, over: Row = {}): Row {
  return {
    slug,
    character: "character-player/the-game-nala",
    skill: "world-skill/path-of-counting",
    experience: 12,
    ...over,
  }
}

const HOLDING = heldRow("the-game-nala-path-of-counting")

function standing(over: Partial<Held> = {}): Held {
  return {
    turn: {
      slug: "the-game-00-002",
      position: 2,
      stepStatus: statusOf(PLAYER),
      beats: FIRST_BEAT,
    },
    held: HOLDING,
    player: { slug: "the-game-nala", story: `story-played/${GAME}` },
    mine: [HOLDING],
    ...over,
  }
}

function callsOver(held: Held): { readonly calls: Calls; readonly written: Writing[] } {
  const written: Writing[] = []
  const answered = (query: Query): readonly Row[] => {
    const where = Object.keys(query.where ?? {})
    if (query.pageTypeSlug === "story-turn-played") return [held.turn]
    if (query.pageTypeSlug === "character-player") return [held.player]
    if (query.pageTypeSlug === "world-ability-kind") return [PATH]
    if (query.pageTypeSlug === "world-skill") return [COUNTING]
    return where.includes("character") ? held.mine : [held.held]
  }
  const calls: Calls = {
    ask: async (query) => {
      const rows = answered(query)
      return { rows, n: rows.length, at: "commit-read" }
    },
    write: async (asked) => {
      written.push(asked)
      return { commit: "commit-written", wrote: [], took: [] }
    },
  }
  return { calls, written }
}

test("setting a path aside adds one beat to the latest turn and changes the path's page", async () => {
  const { calls, written } = callsOver(standing())
  const answer = await heldAbilitySet(GAME, HELD, "set-aside", calls)
  expect(answer).toEqual({
    kind: "set",
    event: "Path of Counting is set aside at tier 1.",
    turn: "the-game-00-002",
  })
  const beat = {
    beat: 2,
    event: "Path of Counting is set aside at tier 1.",
    changes: [
      { page: HELD, note: "Path of Counting set aside", key: "dormant", from: null, to: true },
      {
        page: HELD,
        note: "Path of Counting loses 2 toward its next tier",
        key: "experience",
        from: 12,
        to: 10,
      },
    ],
  }
  expect(written).toHaveLength(1)
  expect(written[0]?.read).toBe("commit-read")
  expect(written[0]?.pages).toEqual([
    {
      pageTypeSlug: "story-turn-played",
      slug: "the-game-00-002",
      merge: true,
      values: {},
      bodies: { beats: `${FIRST_BEAT}${JSON.stringify(beat)}\n` },
    },
    {
      pageTypeSlug: "character-skill",
      slug: "the-game-nala-path-of-counting",
      merge: true,
      values: { dormant: true, experience: 10 },
    },
  ])
})

test("a change while the latest turn is being made is refused and nothing is written", async () => {
  const making = standing({
    turn: { slug: "the-game-00-003", position: 3, stepStatus: statusOf(GAME_MASTER) },
  })
  const { calls, written } = callsOver(making)
  const answer = await heldAbilitySet(GAME, HELD, "set-aside", calls)
  expect(answer).toEqual({
    kind: "refused",
    said: "The last turn is still being made: the game master is working on it.",
  })
  expect(written).toEqual([])
})

test("a path held by someone playing another story is refused", async () => {
  const elsewhere = standing({ player: { slug: "the-game-nala", story: "story-played/another" } })
  const { calls, written } = callsOver(elsewhere)
  const answer = await heldAbilitySet(GAME, HELD, "set-aside", calls)
  expect(answer).toEqual({
    kind: "refused",
    said: `\`${HELD}\` is held by no one playing \`${GAME}\`.`,
  })
  expect(written).toEqual([])
})

test("taking a path up is refused while every slot of its kind is held", async () => {
  const aside = heldRow("the-game-nala-path-of-counting", { dormant: true })
  const worked = Array.from({ length: 10 }, (_, at) => heldRow(`worked-${String(at)}`))
  const { calls, written } = callsOver(standing({ held: aside, mine: [aside, ...worked] }))
  const answer = await heldAbilitySet(GAME, HELD, "taken-up", calls)
  expect(answer).toEqual({
    kind: "refused",
    said: "All 10 Paths slots are held, so set one aside first.",
  })
  expect(written).toEqual([])
})

test("a path set aside is taken up again while a slot is free", async () => {
  const aside = heldRow("the-game-nala-path-of-counting", { dormant: true, experience: 10 })
  const { calls, written } = callsOver(standing({ held: aside, mine: [aside] }))
  const answer = await heldAbilitySet(GAME, HELD, "taken-up", calls)
  expect(answer).toEqual({
    kind: "set",
    event: "Path of Counting is taken up again.",
    turn: "the-game-00-002",
  })
  expect(written[0]?.pages?.[1]).toEqual({
    pageTypeSlug: "character-skill",
    slug: "the-game-nala-path-of-counting",
    merge: true,
    values: { dormant: false },
  })
})

test("a name that is no held skill is refused before anything is asked", async () => {
  const { calls, written } = callsOver(standing())
  const answer = await heldAbilitySet(GAME, "world-skill/path-of-counting", "set-aside", calls)
  expect(answer).toEqual({
    kind: "refused",
    said: "`world-skill/path-of-counting` names no held skill.",
  })
  expect(written).toEqual([])
})
