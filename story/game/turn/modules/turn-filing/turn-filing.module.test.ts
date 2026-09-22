import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"
import {
  detailedIn,
  everyTurnFiled,
  numberedAs,
  raisedAt,
  raisedIn,
} from "akasha/story/game/turn/modules/turn-filing/turn-filing.module.code.ts"

const GAME = namedAs(game.slug, theTower.slug, null)

const WHERE: Where = {
  root: process.cwd(),
  game: GAME,
  slug: theTower.slug,
  path: `story/game/pages/${theTower.slug}/${theTower.slug}.${game.slug}.ts`,
  folder: `story/game/pages/${theTower.slug}`,
}

const ROW = {
  externalId: theTower.slug,
  turn: 88,
  log: [
    { id: "b134", text: "Then you climb", turn: 56, type: "narrative" },
    { id: "b139", turn: 58, type: "system", window: { type: "level-up", level: 5 } },
    {
      id: "b155",
      turn: 65,
      type: "system",
      window: { rank: "Apprentice", type: "skill", skill: "Smithing" },
    },
    {
      id: "b210",
      turn: 88,
      type: "system",
      window: {
        type: "item-award",
        award: {
          item: "Clouded lens",
          descriptors: [{ label: "Recovered from", value: "the Host's seat" }],
        },
      },
    },
  ],
}

test("a turn number is padded so the pages of one game sort by their play", () => {
  expect(numberedAs(7)).toBe("007")
  expect(numberedAs(88)).toBe("088")
})

test("what a window says about one thing comes off as a kind, a name and a line", () => {
  expect(raisedIn({ type: "level-up", level: 5 })).toEqual({
    kind: "level-up",
    name: undefined,
    rung: undefined,
    level: 5,
    note: undefined,
  })
  expect(raisedIn({ rank: "Apprentice", type: "skill", skill: "Smithing" })).toEqual({
    kind: "skill",
    name: "Smithing",
    rung: "Apprentice",
    level: undefined,
    note: undefined,
  })
  expect(raisedIn({ type: "affinity", affinity: "Force Affinity" })?.name).toBe("Force Affinity")
  expect(raisedIn("a beat")).toBe(undefined)
})

test("what an award was recovered from comes off as the line about it", () => {
  expect(detailedIn([{ label: "Recovered from", value: "the Host's seat" }])).toBe(
    "Recovered from: the Host's seat"
  )
  expect(detailedIn(undefined)).toBe(undefined)
})

test("every turn the log names is a turn, and only a system beat leaves a window", () => {
  const raised = raisedAt(ROW)
  expect([...raised.keys()].sort((one, two) => one - two)).toEqual([56, 58, 65, 88])
  expect(raised.get(56)).toEqual([])
  expect(raised.get(88)).toHaveLength(1)
})

test("the turn a state is at is a turn even where no beat names it", () => {
  expect([...raisedAt({ turn: 4, log: [] }).keys()]).toEqual([4])
})

test("each turn becomes a page under its game, named by its number", () => {
  const placed = everyTurnFiled(WHERE, [ROW])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered.map((one) => one.at)).toEqual([
    "story/game/pages/the-tower/turns/the-tower-056.game-turn.ts",
    "story/game/pages/the-tower/turns/the-tower-058.game-turn.ts",
    "story/game/pages/the-tower/turns/the-tower-065.game-turn.ts",
    "story/game/pages/the-tower/turns/the-tower-088.game-turn.ts",
  ])
  expect(placed.answered[0]?.body).toContain("number: 56")
  expect(placed.answered[0]?.body).not.toContain("windows")
  expect(placed.answered[1]?.body).toContain('{kind:"level-up",level:5}')
  expect(placed.answered[3]?.body).toContain("Recovered from: the Host's seat")
})

test("a state with no row leaves no turn", () => {
  const placed = everyTurnFiled(WHERE, [])
  if ("refused" in placed) throw new Error(placed.refused)
  expect(placed.answered).toEqual([])
})
