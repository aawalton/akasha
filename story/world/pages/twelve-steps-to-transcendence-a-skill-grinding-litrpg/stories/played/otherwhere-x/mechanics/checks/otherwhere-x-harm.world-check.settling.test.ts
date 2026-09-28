import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-harm.world-check.settling.code.ts"

test("a farmhand's solid blow deals the die plus two", () => {
  expect(
    settled(
      { force: "solid", tier: 0, landed: "success", health: 20, maxHealth: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 6, health: 14, wound: "scraped" } })
})

test("a Tier 1 wolf's solid bite deals three times over", () => {
  expect(
    settled(
      { force: "solid", tier: 1, landed: "success", health: 20, maxHealth: 20 },
      { total: 3, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 15, health: 5, wound: "grievous" } })
})

test("a strong blow deals three more before the tier scales it", () => {
  expect(
    settled(
      { force: "light", tier: 0, landed: "strong", health: 20, maxHealth: 20 },
      { total: 2, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 5)
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(
    settled(
      { force: "heavy", tier: 1, landed: "cost", health: 60, maxHealth: 60 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 11)
})

test("a ward takes from the blow, but a blow deals at least one before scaling", () => {
  expect(
    settled(
      { force: "light", tier: 1, landed: "success", ward: 8, health: 60, maxHealth: 60 },
      { total: 1, crit: false, fumble: true }
    )
  ).toHaveProperty("answered.harm", 3)
})

test("a Tier 2 savage blow takes a Tier 0 woman down", () => {
  expect(
    settled(
      { force: "savage", tier: 2, landed: "success", health: 20, maxHealth: 20 },
      { total: 1, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.wound", "down")
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled(
      { force: "solid", tier: 0, landed: "failure", health: 20, maxHealth: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("health past the most health is refused", () => {
  expect(
    settled(
      { force: "solid", tier: 0, landed: "success", health: 30, maxHealth: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})
