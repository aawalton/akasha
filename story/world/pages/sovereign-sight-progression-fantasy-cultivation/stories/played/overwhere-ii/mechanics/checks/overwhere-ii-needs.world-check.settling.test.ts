import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/checks/overwhere-ii-needs.world-check.settling.code.ts"

const NALA = "her"

test("Nala as she woke is thirsty, hungry, rested and chilled", () => {
  const felt = settled({ character: NALA, sinceDrink: 11, sinceMeal: 12, awake: 0, coldHours: 1 })
  expect(felt).toHaveProperty("answered.thirst.stage", "thirsty")
  expect(felt).toHaveProperty("answered.hunger.stage", "hungry")
  expect(felt).toHaveProperty("answered.sleep.stage", "rested")
  expect(felt).toHaveProperty("answered.cold.stage", "chilled")
})

test("a day without food leaves her hungry", () => {
  expect(settled({ character: NALA, sinceDrink: 1, sinceMeal: 24, awake: 10 })).toHaveProperty(
    "answered.hunger.stage",
    "hungry"
  )
})

test("a reading naming no character is refused", () => {
  expect(settled({ character: " ", sinceDrink: 1, sinceMeal: 1, awake: 1 })).toHaveProperty(
    "refused"
  )
})
