import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-harm.world-check.settling.code.ts"

test("an F Grade solid bite deals the die plus two, six times over", () => {
  expect(
    settled(
      { force: "solid", grade: "F", landed: "success", health: 170, maxHealth: 170 },
      { total: 4, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 36, health: 134, wound: "whole" } })
})

test("a strong blow deals three more before the grade scales it", () => {
  expect(
    settled(
      { force: "light", grade: "G", landed: "strong", health: 90, maxHealth: 90 },
      { total: 2, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 15)
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(
    settled(
      { force: "heavy", grade: "E", landed: "cost", health: 170, maxHealth: 170 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 42)
})

test("a ward takes from the blow, but a blow deals at least one before scaling", () => {
  expect(
    settled(
      { force: "light", grade: "F", landed: "success", ward: 8, health: 170, maxHealth: 170 },
      { total: 1, crit: false, fumble: true }
    )
  ).toHaveProperty("answered.harm", 6)
})

test("a quarter of her health or less left is grievous", () => {
  expect(
    settled(
      { force: "solid", grade: "F", landed: "success", health: 80, maxHealth: 170 },
      { total: 5, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 42, health: 38, wound: "grievous" } })
})

test("a D Grade savage blow takes a level-one woman down", () => {
  expect(
    settled(
      { force: "savage", grade: "D", landed: "success", health: 170, maxHealth: 170 },
      { total: 1, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.wound", "down")
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled(
      { force: "solid", grade: "F", landed: "failure", health: 170, maxHealth: 170 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("health past the most health is refused", () => {
  expect(
    settled(
      { force: "solid", grade: "F", landed: "success", health: 200, maxHealth: 170 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})
