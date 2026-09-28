import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-harm.world-check.settling.code.ts"

test("a student's bruising bolt deals the die plus two and takes it from health", () => {
  expect(
    settled(
      { force: "solid", landed: "success", health: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 6, health: 14, wound: "scraped" } })
})

test("a strong blow deals three more", () => {
  expect(
    settled(
      { force: "light", landed: "strong", health: 20 },
      { total: 2, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 5)
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(
    settled(
      { force: "heavy", landed: "cost", health: 20 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 4)
})

test("an arena shield takes from the harm, but a blow deals at least one", () => {
  expect(
    settled(
      { force: "light", landed: "success", ward: 7, health: 20 },
      { total: 1, crit: false, fumble: true }
    )
  ).toHaveProperty("answered.harm", 1)
})

test("a crushing sequence against a duelling shield leaves her hurt", () => {
  expect(
    settled(
      { force: "crushing", landed: "strong", ward: 5, health: 20 },
      { total: 6, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 14, health: 6, wound: "hurt" } })
})

test("health at nought is down", () => {
  expect(
    settled(
      { force: "savage", landed: "success", health: 9 },
      { total: 5, crit: false, fumble: false }
    )
  ).toEqual({ answered: { harm: 12, health: 0, wound: "down" } })
})

test("five health left is grievous", () => {
  expect(
    settled(
      { force: "light", landed: "success", health: 8 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.wound", "grievous")
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled(
      { force: "solid", landed: "failure", health: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("a ward past seven is refused", () => {
  expect(
    settled(
      { force: "solid", landed: "success", ward: 8, health: 20 },
      { total: 4, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})
