import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/checks/otherwhere-i-harm.world-check.settling.code.ts"

function rolled(total: number) {
  return { total, crit: total === 6, fumble: total === 1 }
}

test("a solid blow deals the die plus two", () => {
  expect(settled({ force: "solid", landed: "success" }, rolled(4))).toEqual({
    answered: { harm: 6 },
  })
})

test("a strong blow deals three more", () => {
  expect(settled({ force: "light", landed: "strong" }, rolled(2))).toEqual({
    answered: { harm: 5 },
  })
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(settled({ force: "heavy", landed: "cost" }, rolled(3))).toEqual({
    answered: { harm: 3 },
  })
})

test("a ward takes from the harm", () => {
  expect(settled({ force: "crushing", landed: "success", ward: 4 }, rolled(5))).toEqual({
    answered: { harm: 9 },
  })
})

test("a blow that lands always deals at least one", () => {
  expect(settled({ force: "light", landed: "cost", ward: 6 }, rolled(1))).toEqual({
    answered: { harm: 1 },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(settled({ force: "solid", landed: "failure" }, rolled(4))).toHaveProperty("refused")
})

test("a force the game does not have is refused", () => {
  expect(settled({ force: "divine", landed: "success" }, rolled(4))).toHaveProperty("refused")
})

test("a ward past six is refused", () => {
  expect(settled({ force: "solid", landed: "success", ward: 7 }, rolled(4))).toHaveProperty(
    "refused"
  )
})
