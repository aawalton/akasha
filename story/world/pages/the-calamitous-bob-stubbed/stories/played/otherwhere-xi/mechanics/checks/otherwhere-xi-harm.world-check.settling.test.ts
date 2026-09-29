import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-harm.world-check.settling.code.ts"

test("a scalehound's heavy bite at step four deals the die plus four, six times over", () => {
  expect(
    settled(
      { force: "heavy", step: 4, landed: "success", health: 38, maxHealth: 38 },
      { total: 1, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 30, health: 8, wound: "grievous" } })
})

test("a village brawler's light punch at step nought deals the die alone", () => {
  expect(
    settled(
      { force: "light", step: 0, landed: "success", health: 38, maxHealth: 38 },
      { total: 3, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 3, health: 35, wound: "whole" } })
})

test("a strong blow deals three more before the step scales it", () => {
  expect(
    settled(
      { force: "solid", step: 2, landed: "strong", health: 38, maxHealth: 38 },
      { total: 2, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 14)
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(
    settled(
      { force: "heavy", step: 2, landed: "cost", health: 38, maxHealth: 38 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 7)
})

test("mail takes four from the blow, but a blow deals at least one before scaling", () => {
  expect(
    settled(
      { force: "light", step: 3, landed: "success", ward: 4, health: 60, maxHealth: 60 },
      { total: 1, crit: false, fumble: true }
    )
  ).toHaveProperty("answered.harm", 3)
})

test("a lethal beast's savage blow takes a woman with no path down", () => {
  expect(
    settled(
      { force: "savage", step: 6, landed: "success", health: 38, maxHealth: 38 },
      { total: 1, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.wound", "down")
})

test("a step past six is refused", () => {
  expect(
    settled(
      { force: "solid", step: 7, landed: "success", health: 38, maxHealth: 38 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled(
      { force: "solid", step: 1, landed: "failure", health: 38, maxHealth: 38 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("health past the most health is refused", () => {
  expect(
    settled(
      { force: "solid", step: 1, landed: "success", health: 50, maxHealth: 38 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})
