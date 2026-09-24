import { expect, test } from "bun:test"
import { summed } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

test("a term adds as much of the value the term names as the term says", () => {
  expect(
    summed({
      terms: [{ of: "might", by: 0.7 }],
      constant: 2,
      rounding: "none",
      held: { might: 10 },
    })
  ).toEqual({ answered: 9 })
})

test("a term naming a value the sheet does not hold is refused", () => {
  const answer = summed({
    terms: [{ of: "wits", by: 1 }],
    constant: 0,
    rounding: "none",
    held: { might: 10 },
  })
  expect(answer).toHaveProperty("refused")
})

test("the sum is rounded as the summing asks", () => {
  const summing = { terms: [{ of: "might", by: 0.5 }], constant: 0, held: { might: 5 } }
  expect(summed({ ...summing, rounding: "down" })).toEqual({ answered: 2 })
  expect(summed({ ...summing, rounding: "up" })).toEqual({ answered: 3 })
  expect(summed({ ...summing, rounding: "nearest" })).toEqual({ answered: 3 })
  expect(summed({ ...summing, rounding: "none" })).toEqual({ answered: 2.5 })
})

test("a value a piece of equipment holds is named as the piece then the value", () => {
  expect(
    summed({
      terms: [{ of: "weapon.atk", by: 1 }],
      constant: 0,
      rounding: "none",
      held: { "weapon.atk": 4 },
    })
  ).toEqual({ answered: 4 })
})
