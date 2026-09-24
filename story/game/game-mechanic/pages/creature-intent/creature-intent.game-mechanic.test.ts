import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/creature-intent/creature-intent.game-mechanic.code.ts"

function rolled(total: number) {
  return { total, crit: total === 10, fumble: total === 1 }
}

test("a creature of sixteen intellect aims between four and eight", () => {
  expect(runMechanic({ intellect: 16, roll: rolled(1) })).toEqual({ intent: 4 })
  expect(runMechanic({ intellect: 16, roll: rolled(10) })).toEqual({ intent: 8 })
})

test("a creature of little wit aims low whatever it rolls", () => {
  expect(runMechanic({ intellect: 2, roll: rolled(1) })).toEqual({ intent: 1 })
  expect(runMechanic({ intellect: 2, roll: rolled(10) })).toEqual({ intent: 1 })
})

test("a creature's intent is held at ten however sharp it is", () => {
  expect(runMechanic({ intellect: 40, roll: rolled(10) })).toEqual({ intent: 10 })
})
