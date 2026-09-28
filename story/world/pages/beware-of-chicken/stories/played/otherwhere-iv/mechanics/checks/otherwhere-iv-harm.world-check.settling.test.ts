import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/checks/otherwhere-iv-harm.world-check.settling.code.ts"

const FOUR = { total: 4, crit: false, fumble: false }

const ONE = { total: 1, crit: false, fumble: true }

test("a dog's solid bite deals the die plus two", () => {
  expect(settled({ force: "solid", landed: "success" }, FOUR)).toEqual({ answered: { harm: 6 } })
})

test("a cultivator's crushing blow deals the die plus eight", () => {
  expect(settled({ force: "crushing", landed: "success" }, FOUR)).toEqual({
    answered: { harm: 12 },
  })
})

test("a strong blow deals three more", () => {
  expect(settled({ force: "light", landed: "strong" }, FOUR)).toEqual({ answered: { harm: 7 } })
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(settled({ force: "heavy", landed: "cost" }, FOUR)).toEqual({ answered: { harm: 4 } })
})

test("leather takes two from the harm", () => {
  expect(settled({ force: "heavy", landed: "success", ward: 2 }, FOUR)).toEqual({
    answered: { harm: 6 },
  })
})

test("a blow that lands always deals at least one", () => {
  expect(settled({ force: "light", landed: "cost", ward: 6 }, ONE)).toEqual({
    answered: { harm: 1 },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(settled({ force: "solid", landed: "failure" }, FOUR)).toHaveProperty("refused")
})

test("a ward past six is refused", () => {
  expect(settled({ force: "solid", landed: "success", ward: 7 }, FOUR)).toHaveProperty("refused")
})
