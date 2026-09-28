import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-needs.world-check.settling.code.ts"

test("a body just arrived is slaked, fed, rested and warm", () => {
  expect(settled({ character: "nala", sinceDrink: 4, sinceMeal: 5, awake: 0 })).toEqual({
    answered: {
      thirst: { weight: 4, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { weight: 5, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 0, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { weight: 0, stage: "warm", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("a morning without breakfast after arriving is hungry", () => {
  expect(settled({ character: "nala", sinceDrink: 2, sinceMeal: 12, awake: 7 })).toHaveProperty(
    "answered.hunger.stage",
    "hungry"
  )
})

test("an hour in a thin shirt in the spring dark is chilled", () => {
  expect(
    settled({ character: "nala", sinceDrink: 4, sinceMeal: 5, awake: 1, coldHours: 1 })
  ).toHaveProperty("answered.cold", { weight: 1, stage: "chilled", bonus: -1, harmPerHour: 0 })
})

test("rain counts cold twice, and freezing does harm", () => {
  expect(
    settled({ character: "nala", sinceDrink: 4, sinceMeal: 5, awake: 3, coldHours: 3, wet: true })
  ).toHaveProperty("answered.cold", { weight: 6, stage: "freezing", bonus: -4, harmPerHour: 2 })
})

test("a need with no hours is refused", () => {
  expect(settled({ character: "nala", sinceDrink: 4 })).toHaveProperty("refused")
})
