import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/checks/otherwhere-vi-needs.world-check.settling.code.ts"

const NALA = "her"

test("Nala as she came is slaked, fed and rested, but chilled in the wet", () => {
  const felt = settled({
    character: NALA,
    sinceDrink: 3,
    sinceMeal: 4,
    awake: 14,
    coldHours: 1,
    wet: true,
  })
  expect(felt).toHaveProperty("answered.thirst.stage", "slaked")
  expect(felt).toHaveProperty("answered.hunger.stage", "fed")
  expect(felt).toHaveProperty("answered.sleep.stage", "rested")
  expect(felt).toHaveProperty("answered.cold.stage", "chilled")
})

test("a night in the wet open freezes her", () => {
  expect(
    settled({ character: NALA, sinceDrink: 2, sinceMeal: 14, awake: 22, coldHours: 4, wet: true })
  ).toHaveProperty("answered.cold.stage", "freezing")
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
