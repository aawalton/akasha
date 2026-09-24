import { expect, test } from "bun:test"
import { climbingBy } from "akasha/story/game/game-mechanic/modules/rank-ladder/rank-ladder.module.code.ts"

const LADDER = climbingBy(["novice", "adept", "master"])

test("a ladder is climbed one rank at a time", () => {
  expect(LADDER({ rank: "novice" })).toEqual({ answered: { rank: "adept", topped: false } })
  expect(LADDER({ rank: "adept" })).toEqual({ answered: { rank: "master", topped: false } })
})

test("a climber at the top remains at the top", () => {
  expect(LADDER({ rank: "master" })).toEqual({ answered: { rank: "master", topped: true } })
})

test("a rank the ladder does not carry is refused", () => {
  expect(LADDER({ rank: "sage" })).toHaveProperty("refused")
})
