import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/checks/otherwhere-vii-harm.world-check.settling.code.ts"

test("a dog's solid bite deals the die plus two", () => {
  expect(
    settled({ force: "solid", landed: "success" }, { total: 3, crit: false, fumble: false })
  ).toEqual({ answered: { harm: 5 } })
})

test("a mage's crushing blow deals the die plus eight", () => {
  expect(
    settled({ force: "crushing", landed: "success" }, { total: 2, crit: false, fumble: false })
  ).toEqual({ answered: { harm: 10 } })
})

test("a blow landed strongly deals three more", () => {
  expect(
    settled({ force: "light", landed: "strong" }, { total: 5, crit: false, fumble: false })
  ).toEqual({ answered: { harm: 8 } })
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(
    settled({ force: "heavy", landed: "cost" }, { total: 5, crit: false, fumble: false })
  ).toEqual({ answered: { harm: 4 } })
})

test("monster-hide armour takes four from the harm", () => {
  expect(
    settled({ force: "heavy", landed: "success", ward: 4 }, { total: 6, crit: true, fumble: false })
  ).toEqual({ answered: { harm: 6 } })
})

test("a landed blow deals one at the least", () => {
  expect(
    settled({ force: "light", landed: "cost", ward: 6 }, { total: 1, crit: false, fumble: true })
  ).toEqual({ answered: { harm: 1 } })
})

test("a failed blow is no blow and is refused", () => {
  expect(
    settled({ force: "solid", landed: "failure" }, { total: 3, crit: false, fumble: false })
  ).toHaveProperty("refused")
})

test("a ward thicker than six is refused", () => {
  expect(
    settled(
      { force: "solid", landed: "success", ward: 9 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})
