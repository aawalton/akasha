import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/checks/otherwhere-conditioning.world-check.settling.code.ts"

const WHO = "the castaway"

test("a deadly battle raises a physical baseline by one", () => {
  expect(
    settled({ character: WHO, attribute: "toughness", baseline: 3, ordeal: "deadly-battle" })
  ).toEqual({ answered: { rises: true, baseline: 4, capBonus: 0 } })
})

test("an ordeal that does not fit the attribute raises nothing", () => {
  expect(
    settled({ character: WHO, attribute: "mind", baseline: 5, ordeal: "long-training" })
  ).toEqual({ answered: { rises: false, baseline: 5, capBonus: 0 } })
})

test("reaching the grade's cap gives a bonus point", () => {
  expect(settled({ character: WHO, attribute: "mind", baseline: 9, ordeal: "study" })).toEqual({
    answered: { rises: true, baseline: 10, capBonus: 1 },
  })
})

test("a baseline at the cap rises no further", () => {
  expect(
    settled({ character: WHO, attribute: "magic", baseline: 10, ordeal: "mana-practice" })
  ).toHaveProperty("answered.rises", false)
})

test("at grade D the cap is twenty-five and its bonus five", () => {
  expect(
    settled({
      character: WHO,
      attribute: "charisma",
      baseline: 24,
      ordeal: "social-stakes",
      grade: "D",
    })
  ).toEqual({ answered: { rises: true, baseline: 25, capBonus: 5 } })
})

test("an attribute the game does not have is refused", () => {
  expect(
    settled({ character: WHO, attribute: "luck", baseline: 3, ordeal: "study" })
  ).toHaveProperty("refused")
})
