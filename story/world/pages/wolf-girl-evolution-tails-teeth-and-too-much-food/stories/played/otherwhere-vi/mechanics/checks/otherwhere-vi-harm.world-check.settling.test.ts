import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/checks/otherwhere-vi-harm.world-check.settling.code.ts"

function rolled(total: number) {
  return { total, crit: total === 12, fumble: total === 2 }
}

test("a solid blow deals the dice plus three", () => {
  expect(settled({ force: "solid", landed: "success" }, rolled(7))).toEqual({
    answered: { harm: 10 },
  })
})

test("a strong blow deals four more", () => {
  expect(settled({ force: "light", landed: "strong" }, rolled(5))).toEqual({
    answered: { harm: 9 },
  })
})

test("might adds to the blow", () => {
  expect(settled({ force: "heavy", landed: "success", might: 2 }, rolled(6))).toEqual({
    answered: { harm: 15 },
  })
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(settled({ force: "heavy", landed: "cost" }, rolled(6))).toEqual({
    answered: { harm: 6 },
  })
})

test("a ward takes from the harm", () => {
  expect(settled({ force: "crushing", landed: "success", ward: 4 }, rolled(8))).toEqual({
    answered: { harm: 18 },
  })
})

test("a blow that lands always deals at least one", () => {
  expect(settled({ force: "light", landed: "cost", ward: 10 }, rolled(2))).toEqual({
    answered: { harm: 1 },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(settled({ force: "solid", landed: "failure" }, rolled(7))).toHaveProperty("refused")
})

test("a force the world does not have is refused", () => {
  expect(settled({ force: "divine", landed: "success" }, rolled(7))).toHaveProperty("refused")
})

test("a ward past ten is refused", () => {
  expect(settled({ force: "solid", landed: "success", ward: 11 }, rolled(7))).toHaveProperty(
    "refused"
  )
})
