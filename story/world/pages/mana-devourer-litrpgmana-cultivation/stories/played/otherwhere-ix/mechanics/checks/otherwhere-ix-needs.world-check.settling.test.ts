import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-needs.world-check.settling.code.ts"

test("a body just come to the Flats is slaked, fed, rested and warm", () => {
  expect(settled({ character: "nala", sinceDrink: 3, sinceMeal: 4, awake: 10 })).toEqual({
    answered: {
      thirst: { weight: 3, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { weight: 4, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 10, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { weight: 0, stage: "warm", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("a day without water is parched", () => {
  expect(settled({ character: "nala", sinceDrink: 14, sinceMeal: 4, awake: 4 })).toHaveProperty(
    "answered.thirst.stage",
    "parched"
  )
})

test("four hours of night on the open Flats is shivering", () => {
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
