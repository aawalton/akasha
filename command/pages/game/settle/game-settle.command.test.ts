import { expect, test } from "bun:test"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  bonusesIn,
  gameSettle,
  messageFor,
  readingIn,
  rowsOf,
  taken,
} from "akasha/command/pages/game/settle/game-settle.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.ts"
import type { MechanicRun } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { attributeCheck } from "akasha/story/game/game-mechanic/pages/attribute-check/attribute-check.game-mechanic.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const CALLED = "akasha game settle"

const GAME = namedAs(storyGame.slug, theTower.slug, null)

const CHECK = namedAs(gameMechanic.slug, attributeCheck.slug, null)

const UNDER = `story/game/pages/${theTower.slug}/mechanic-runs/`

const GIVEN: Given = {
  root: process.cwd(),
  calledAs: CALLED,
  from: "",
  writer: null,
  agentId: null,
}

const APPLIED = {
  base: "",
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: "a-commit",
}

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

test("a settled turn becomes a page of its own, and its numbers are answered", async () => {
  const asked: Asking[] = []
  const answer = await gameSettle([...ARGV, "--dice", "1d20"], GIVEN, async (_root, held) => {
    asked.push(...held)
    return APPLIED
  })
  expect(answer.refusals).toEqual([])
  const paths = asked.map((one) => (one.given as { readonly at: string }).at)
  expect(paths.every((one) => one.startsWith(UNDER))).toBe(true)
  const beside = asked.find((one) =>
    (one.given as { readonly at: string }).at.endsWith(".workings.json")
  )
  if (beside === undefined) throw new Error("the run itself is written beside its page")
  const row = JSON.parse((beside.given as { readonly body: string }).body) as MechanicRun
  expect(row.turn).toBe(87)
  expect(row.mechanic).toBe(CHECK)
  expect(row.dice?.faces).toHaveLength(1)
  expect(typeof row.seed).toBe("string")
  expect(row.answered).toHaveProperty("margin")
  expect(answer.report).toContain(`commit\t${APPLIED.commit}`)
})

test("a mechanic that refuses writes no page", async () => {
  const asked: Asking[] = []
  const argv = [...ARGV]
  argv[5] = namedAs(gameMechanic.slug, "nothing-is-filed-here", null)
  const answer = await gameSettle(argv, GIVEN, async (_root, held) => {
    asked.push(...held)
    return APPLIED
  })
  expect(asked).toEqual([])
  expect(answer.refusals).not.toEqual([])
})
