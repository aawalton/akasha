import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/skill-bonus/skill-bonus.game-mechanic.code.ts"

test("a skill adds by its rung, and the bonus names the skill it came from", () => {
  expect(runMechanic({ skill: "ember channel", rank: "journeyman" })).toEqual({
    answered: { from: "ember channel", by: 2 },
  })
})

test("a novice adds nothing and a sage adds six", () => {
  expect(runMechanic({ skill: "smithing", rank: "novice" })).toEqual({
    answered: { from: "smithing", by: 0 },
  })
  expect(runMechanic({ skill: "smithing", rank: "sage" })).toEqual({
    answered: { from: "smithing", by: 6 },
  })
})

test("a rung no skill climbs is refused", () => {
  expect(runMechanic({ skill: "smithing", rank: "kindled" })).toHaveProperty("refused")
})
