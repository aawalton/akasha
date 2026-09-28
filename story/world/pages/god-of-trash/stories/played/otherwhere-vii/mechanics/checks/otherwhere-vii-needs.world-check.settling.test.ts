import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/checks/otherwhere-vii-needs.world-check.settling.code.ts"

test("Nala waking in the ditch is thirsty, fed, rested and warm", () => {
  expect(
    settled({ character: "otherwhere-vii-nala", sinceDrink: 9, sinceMeal: 11, awake: 0 })
  ).toEqual({
    answered: {
      thirst: { weight: 9, stage: "thirsty", bonus: -1, harmPerHour: 0 },
      hunger: { weight: 11, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 0, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { weight: 0, stage: "warm", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("an hour on the road soaked through is chilled", () => {
  expect(
    settled({
      character: "otherwhere-vii-nala",
      sinceDrink: 10,
      sinceMeal: 12,
      awake: 1,
      coldHours: 1,
      wet: true,
    })
  ).toHaveProperty("answered.cold.stage", "chilled")
})

test("a day and a half without food is hungry", () => {
  expect(
    settled({ character: "otherwhere-vii-nala", sinceDrink: 2, sinceMeal: 35, awake: 5 })
  ).toHaveProperty("answered.hunger.stage", "hungry")
})

test("a reading with no waking hours is refused", () => {
  expect(settled({ character: "otherwhere-vii-nala", sinceDrink: 2, sinceMeal: 3 })).toHaveProperty(
    "refused"
  )
})
