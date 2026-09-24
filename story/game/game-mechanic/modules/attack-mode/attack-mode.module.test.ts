import { expect, test } from "bun:test"
import { attackBy } from "akasha/story/game/game-mechanic/modules/attack-mode/attack-mode.module.code.ts"
import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

const MODE = attackBy(
  summingBy([{ of: "might", by: 2 }], 0, "none"),
  summingBy([{ of: "vitality", by: 1 }], 0, "none")
)

test("the attacker's stat and the defender's are read off their own sheets", () => {
  expect(MODE({ attacker: { might: 7 }, defender: { vitality: 5 } })).toEqual({
    answered: { attackPower: 14, defense: 5 },
  })
})

test("an attacker's sheet missing the stat refuses the mode", () => {
  expect(MODE({ attacker: { vitality: 7 }, defender: { vitality: 5 } })).toHaveProperty("refused")
})

test("a defender's sheet missing the stat refuses the mode", () => {
  expect(MODE({ attacker: { might: 7 }, defender: { might: 5 } })).toHaveProperty("refused")
})
