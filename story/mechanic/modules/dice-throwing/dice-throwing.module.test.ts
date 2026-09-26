import { expect, test } from "bun:test"
import { facesFrom } from "akasha/story/mechanic/modules/dice-rolling/dice-rolling.module.code.ts"
import { thrownFrom } from "akasha/story/mechanic/modules/dice-throwing/dice-throwing.module.code.ts"

test("a throw is the dice rolled from a seed, then read", () => {
  const shown = facesFrom("the-tower/1", "2d10")
  if ("refused" in shown) throw new Error(shown.refused)
  const total = shown.answered.faces.reduce((sum, one) => sum + one, 0)
  expect(thrownFrom("the-tower/1", "2d10")).toEqual({
    answered: { dice: shown.answered, roll: { total, crit: false, fumble: false } },
  })
})

test("a handful that is no handful of dice is refused", () => {
  expect(thrownFrom("a-seed", "two d ten")).toHaveProperty("refused")
})
