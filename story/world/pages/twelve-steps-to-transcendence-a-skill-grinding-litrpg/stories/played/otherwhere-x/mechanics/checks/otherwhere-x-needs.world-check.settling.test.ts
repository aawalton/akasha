import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-needs.world-check.settling.code.ts"

test("a body just come to Harrow Mile is slaked, fed, rested and warm", () => {
  expect(settled({ character: "nala", sinceDrink: 3, sinceMeal: 5, awake: 0 })).toEqual({
    answered: {
      thirst: { weight: 3, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { weight: 5, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 0, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { weight: 0, stage: "warm", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("a day and a half without food is hungry", () => {
  expect(settled({ character: "nala", sinceDrink: 2, sinceMeal: 20, awake: 6 })).toHaveProperty(
    "answered.hunger.stage",
    "hungry"
  )
})

test("four hours of autumn night in a thin shirt is shivering", () => {
  expect(
    settled({ character: "nala", sinceDrink: 2, sinceMeal: 8, awake: 14, coldHours: 4 })
  ).toHaveProperty("answered.cold.stage", "shivering")
})

test("wet cold counts twice, and freezing does harm", () => {
  expect(
    settled({ character: "nala", sinceDrink: 2, sinceMeal: 8, awake: 14, coldHours: 3, wet: true })
  ).toHaveProperty("answered.cold", { weight: 6, stage: "freezing", bonus: -4, harmPerHour: 2 })
})

test("a need with no hours is refused", () => {
  expect(settled({ character: "nala", sinceDrink: 2 })).toHaveProperty("refused")
})
