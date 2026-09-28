import { expect, test } from "bun:test"
import { needsSettled } from "akasha/story/world/mechanics/modules/needs-weighing/needs-weighing.module.code.ts"

test("few hours of each need weigh nothing", () => {
  expect(needsSettled({ character: "nala", sinceDrink: 1, sinceMeal: 1, awake: 1 })).toEqual({
    answered: {
      thirst: { weight: 1, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { weight: 1, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 1, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { weight: 0, stage: "warm", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("thirty hours without water is dying and does harm", () => {
  expect(
    needsSettled({ character: "nala", sinceDrink: 30, sinceMeal: 4, awake: 4 })
  ).toHaveProperty("answered.thirst", { weight: 30, stage: "dying", bonus: -4, harmPerHour: 3 })
})

test("wet cold counts twice", () => {
  expect(
    needsSettled({
      character: "nala",
      sinceDrink: 2,
      sinceMeal: 2,
      awake: 2,
      coldHours: 2,
      wet: true,
    })
  ).toHaveProperty("answered.cold.stage", "shivering")
})

test("a reading naming no character is refused", () => {
  expect(needsSettled({ sinceDrink: 2, sinceMeal: 2, awake: 2 })).toHaveProperty("refused")
})
