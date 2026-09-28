import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-needs.world-check.settling.code.ts"

const NALA = "her"

test("Nala as she came is slaked, fed and rested, but chilled in the wet dew", () => {
  const felt = settled({
    character: NALA,
    sinceDrink: 3,
    sinceMeal: 5,
    awake: 1,
    coldHours: 1,
    wet: true,
  })
  expect(felt).toHaveProperty("answered.thirst.stage", "slaked")
  expect(felt).toHaveProperty("answered.hunger.stage", "fed")
  expect(felt).toHaveProperty("answered.sleep.stage", "rested")
  expect(felt).toHaveProperty("answered.cold.stage", "chilled")
})

test("a night on the open hill in wet clothes freezes her", () => {
  expect(
    settled({ character: NALA, sinceDrink: 2, sinceMeal: 14, awake: 20, coldHours: 4, wet: true })
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
