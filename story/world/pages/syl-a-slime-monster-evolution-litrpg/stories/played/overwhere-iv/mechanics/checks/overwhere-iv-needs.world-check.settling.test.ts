import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-needs.world-check.settling.code.ts"

test("a fed, rested body carries no penalty", () => {
  expect(settled({ hoursSinceMeal: 2, hoursSinceDrink: 1, hoursAwake: 4 })).toEqual({
    answered: { hunger: "fed", thirst: "quenched", fatigue: "rested", chilled: false, penalty: 0 },
  })
})

test("a hungry, weary body takes two", () => {
  expect(settled({ hoursSinceMeal: 14, hoursSinceDrink: 5, hoursAwake: 22 })).toEqual({
    answered: { hunger: "hungry", thirst: "thirsty", fatigue: "weary", chilled: false, penalty: 2 },
  })
})

test("cold without shelter takes one more", () => {
  expect(
    settled({ hoursSinceMeal: 1, hoursSinceDrink: 1, hoursAwake: 1, cold: true, sheltered: false })
  ).toHaveProperty("answered.penalty", 1)
})

test("the penalty never passes four", () => {
  expect(
    settled({
      hoursSinceMeal: 40,
      hoursSinceDrink: 30,
      hoursAwake: 40,
      cold: true,
      sheltered: false,
    })
  ).toHaveProperty("answered.penalty", 4)
})

test("time that runs backward is refused", () => {
  expect(settled({ hoursSinceMeal: -1, hoursSinceDrink: 1, hoursAwake: 1 })).toHaveProperty(
    "refused"
  )
})
