import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/leveling/leveling.game-mechanic.code.ts"

test("a climber who has cleared nothing is at the first level with no points", () => {
  expect(runMechanic({ floorsCleared: 0 })).toEqual({ level: 1, attributePoints: 0 })
})

test("one level is won for each floor cleared", () => {
  expect(runMechanic({ floorsCleared: 1 }).level).toBe(2)
  expect(runMechanic({ floorsCleared: 7 }).level).toBe(8)
})

test("three attribute points come with each level won", () => {
  expect(runMechanic({ floorsCleared: 1 }).attributePoints).toBe(3)
  expect(runMechanic({ floorsCleared: 7 }).attributePoints).toBe(21)
})
