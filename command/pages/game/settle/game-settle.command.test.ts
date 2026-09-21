import { expect, test } from "bun:test"
import {
  bonusesIn,
  messageFor,
  readingIn,
  rowsOf,
  taken,
} from "akasha/command/pages/game/settle/game-settle.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import type { MechanicRun } from "akasha/story/game/mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { attributeCheck } from "akasha/story/game/mechanic/pages/attribute-check/attribute-check.game-mechanic.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const CALLED = "akasha game settle"

const GAME = namedAs(game.slug, theTower.slug, null)

const CHECK = namedAs(gameMechanic.slug, attributeCheck.slug, null)

const ARGV = [
  "--game",
  GAME,
  "--turn",
  "87",
  "--mechanic",
  CHECK,
  "--reading",
  '{"attribute":11,"difficulty":24,"intent":4}',
]

const RAN: MechanicRun = {
  turn: 87,
  mechanic: CHECK,
  reading: { attribute: 11 },
  answered: { hit: true, margin: 3 },
  bonuses: [],
  dice: { said: "1d20", sides: 20, faces: [12] },
  seed: "a-hash",
  follows: "a-hash",
  said: null,
}

test("a call names the game, the turn, the mechanic and what the mechanic reads", () => {
  expect(taken(ARGV, CALLED)).toEqual({
    game: GAME,
    turn: 87,
    mechanic: CHECK,
    reading: { attribute: 11, difficulty: 24, intent: 4 },
    dice: null,
    bonuses: [],
  })
})

test("a call naming dice and bonuses carries both", () => {
  const held = taken(
    [...ARGV, "--dice", "1d20", "--bonuses", '[{"from":"a skill","by":2}]'],
    CALLED
  )
  if ("refused" in held) throw new Error(held.refused)
  expect(held.dice).toBe("1d20")
  expect(held.bonuses).toEqual([{ from: "a skill", by: 2 }])
})

test("a turn that is no whole number of one or more is refused", () => {
  const argv = [...ARGV]
  argv[3] = "0"
  expect(taken(argv, CALLED)).toHaveProperty("refused")
})

test("a reading that is no keyed reading is refused", () => {
  expect(readingIn("[1,2]")).toHaveProperty("refused")
  expect(readingIn("not json")).toHaveProperty("refused")
  expect(readingIn('{"attribute":11}')).toEqual({ answered: { attribute: 11 } })
})

test("a bonus that is no bonus is refused rather than passed over", () => {
  expect(bonusesIn(null)).toEqual({ answered: [] })
  expect(bonusesIn('[{"from":"a skill"}]')).toHaveProperty("refused")
  expect(bonusesIn('{"from":"a skill","by":2}')).toHaveProperty("refused")
  expect(bonusesIn('[{"from":"a skill","by":2}]')).toEqual({
    answered: [{ from: "a skill", by: 2 }],
  })
})

test("what is answered names the dice, the seed and every number the mechanic gave", () => {
  expect(rowsOf(RAN, "a-commit")).toEqual([
    "turn\t87",
    `mechanic\t${CHECK}`,
    "dice\t1d20\t12",
    "seed\ta-hash",
    "hit\ttrue",
    "margin\t3",
    "commit\ta-commit",
  ])
})

test("a run that rolled nothing names no dice and no seed", () => {
  expect(rowsOf({ ...RAN, dice: null, seed: null }, null)).toEqual([
    "turn\t87",
    `mechanic\t${CHECK}`,
    "hit\ttrue",
    "margin\t3",
  ])
})

test("the commit says which turn was settled by which mechanic", () => {
  expect(messageFor(RAN, GAME)).toBe(`settle turn 87 of ${GAME} by ${CHECK}`)
})
