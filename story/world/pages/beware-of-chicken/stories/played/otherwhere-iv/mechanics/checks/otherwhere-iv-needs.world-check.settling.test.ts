import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/checks/otherwhere-iv-needs.world-check.settling.code.ts"

test("a body lately fed, watered and rested, and dry, feels nothing", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 2, sinceMeal: 3, awake: 4 })
  ).toEqual({
    answered: {
      thirst: { hours: 2, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { hours: 3, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { hours: 4, stage: "rested", bonus: 0, harmPerHour: 0 },
      cold: { hours: 0, stage: "nothing", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("thirst past twenty-eight hours is failing and harms one an hour", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 30, sinceMeal: 0, awake: 0 })
  ).toHaveProperty("answered.thirst", {
    hours: 30,
    stage: "failing",
    bonus: -3,
    harmPerHour: 1,
  })
})

test("thirst past forty-eight hours is dying and harms three an hour", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 50, sinceMeal: 0, awake: 0 })
  ).toHaveProperty("answered.thirst", {
    hours: 50,
    stage: "dying",
    bonus: -4,
    harmPerHour: 3,
  })
})

test("hunger is weak under seventy-two hours and starving from there", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 0, sinceMeal: 71, awake: 0 })
  ).toHaveProperty("answered.hunger.stage", "weak")
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 0, sinceMeal: 72, awake: 0 })
  ).toHaveProperty("answered.hunger.stage", "starving")
})

test("twenty hours awake is tired", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: 0, sinceMeal: 0, awake: 20 })
  ).toHaveProperty("answered.sleep", { hours: 20, stage: "tired", bonus: -1, harmPerHour: 0 })
})

test("twelve cold hours is freezing and harms one an hour", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      sinceDrink: 0,
      sinceMeal: 0,
      awake: 0,
      coldHours: 12,
    })
  ).toHaveProperty("answered.cold", { hours: 12, stage: "freezing", bonus: -3, harmPerHour: 1 })
})

test("negative hours are refused", () => {
  expect(
    settled({ character: "otherwhere-iv-nala", sinceDrink: -1, sinceMeal: 0, awake: 0 })
  ).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ sinceDrink: 1, sinceMeal: 1, awake: 1 })).toHaveProperty("refused")
})
