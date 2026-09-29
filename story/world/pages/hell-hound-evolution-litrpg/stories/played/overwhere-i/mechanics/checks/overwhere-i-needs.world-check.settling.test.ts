import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-needs.world-check.settling.code.ts"

const NALA = "her"

test("Nala as she woke at the ford is slaked, fed, rested and warm", () => {
  const felt = settled({ character: NALA, sinceDrink: 2, sinceMeal: 4, awake: 0 })
  expect(felt).toHaveProperty("answered.thirst.bonus", 0)
  expect(felt).toHaveProperty("answered.hunger.bonus", 0)
  expect(felt).toHaveProperty("answered.sleep.bonus", 0)
  expect(felt).toHaveProperty("answered.cold.bonus", 0)
})

test("a day without food costs her one", () => {
  expect(settled({ character: NALA, sinceDrink: 1, sinceMeal: 24, awake: 10 })).toHaveProperty(
    "answered.hunger.bonus",
    -1
  )
})

test("long thirst wears her down by two at most, and takes no health", () => {
  const felt = settled({ character: NALA, sinceDrink: 40, sinceMeal: 1, awake: 1 })
  expect(felt).toHaveProperty("answered.thirst.bonus", -2)
  expect(felt).toHaveProperty("answered.thirst.harmPerHour", 0)
})

test("a wet night in the open wears her down by two at most, and takes no health", () => {
  const felt = settled({
    character: NALA,
    sinceDrink: 2,
    sinceMeal: 10,
    awake: 12,
    coldHours: 5,
    wet: true,
  })
  expect(felt).toHaveProperty("answered.cold.bonus", -2)
  expect(felt).toHaveProperty("answered.cold.harmPerHour", 0)
})

test("days without sleep or food cost two each, no more", () => {
  const felt = settled({ character: NALA, sinceDrink: 1, sinceMeal: 120, awake: 50 })
  expect(felt).toHaveProperty("answered.hunger.bonus", -2)
  expect(felt).toHaveProperty("answered.sleep.bonus", -2)
})

test("a reading naming no character is refused", () => {
  expect(settled({ character: " ", sinceDrink: 1, sinceMeal: 1, awake: 1 })).toHaveProperty(
    "refused"
  )
})
