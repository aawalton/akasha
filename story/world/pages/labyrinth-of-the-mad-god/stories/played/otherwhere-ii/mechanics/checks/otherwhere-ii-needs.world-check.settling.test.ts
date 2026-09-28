import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/checks/otherwhere-ii-needs.world-check.settling.code.ts"

const NALA = "the castaway"

function needs(sinceDrink: number, sinceMeal: number, awake: number) {
  return { character: NALA, sinceDrink, sinceMeal, awake }
}

test("a fresh morning weighs nothing", () => {
  expect(settled(needs(2, 2, 2))).toEqual({
    answered: {
      thirst: { weight: 2, stage: "slaked", bonus: 0, harmPerHour: 0 },
      hunger: { weight: 2, stage: "fed", bonus: 0, harmPerHour: 0 },
      sleep: { weight: 2, stage: "rested", bonus: 0, harmPerHour: 0 },
    },
  })
})

test("an hour in the midday heat counts twice toward thirst", () => {
  expect(settled({ ...needs(5, 5, 5), hotHours: 3 })).toMatchObject({
    answered: { thirst: { weight: 8, stage: "thirsty", bonus: -1 } },
  })
})

test("a day without water is failing, and costs health each hour", () => {
  expect(settled(needs(24, 24, 10))).toMatchObject({
    answered: { thirst: { stage: "failing", bonus: -3, harmPerHour: 1 } },
  })
})

test("past thirty hours without water she is dying", () => {
  expect(settled(needs(31, 31, 10))).toMatchObject({
    answered: { thirst: { stage: "dying", harmPerHour: 3 } },
  })
})

test("a trait lessening her needs lightens every weight", () => {
  expect(settled({ ...needs(16, 48, 24), lessenedBy: 25 })).toMatchObject({
    answered: {
      thirst: { weight: 12, stage: "parched" },
      hunger: { weight: 36, stage: "weak" },
      sleep: { weight: 18, stage: "tired" },
    },
  })
})

test("two days without food leaves her weak", () => {
  expect(settled(needs(2, 48, 2))).toMatchObject({
    answered: { hunger: { stage: "weak", bonus: -2 } },
  })
})

test("a night without sleep leaves her tired", () => {
  expect(settled(needs(2, 2, 24))).toMatchObject({
    answered: { sleep: { stage: "tired", bonus: -1 } },
  })
})

test("hot hours past the hours since a drink are refused", () => {
  expect(settled({ ...needs(2, 2, 2), hotHours: 3 })).toHaveProperty("refused")
})

test("needs naming no character are refused", () => {
  expect(settled({ sinceDrink: 1, sinceMeal: 1, awake: 1 })).toHaveProperty("refused")
})
