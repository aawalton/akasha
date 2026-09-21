import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/mechanic/pages/linear-stat/linear-stat.game-mechanic.code.ts"

test("a term adds as much of the value the term names as the term says", () => {
  expect(
    runMechanic({
      terms: [{ of: "might", by: 0.7 }],
      constant: 2,
      rounding: "none",
      held: { might: 10 },
    })
  ).toEqual({ answered: 9 })
})

test("a term naming a value the sheet does not hold is refused", () => {
  const answer = runMechanic({
    terms: [{ of: "wits", by: 1 }],
    constant: 0,
    rounding: "none",
    held: { might: 10 },
  })
  expect(answer).toHaveProperty("refused")
})

test("the sum is rounded as the mechanic is asked to round it", () => {
  const asking = { terms: [{ of: "might", by: 0.5 }], constant: 0, held: { might: 5 } }
  expect(runMechanic({ ...asking, rounding: "down" })).toEqual({ answered: 2 })
  expect(runMechanic({ ...asking, rounding: "up" })).toEqual({ answered: 3 })
  expect(runMechanic({ ...asking, rounding: "nearest" })).toEqual({ answered: 3 })
  expect(runMechanic({ ...asking, rounding: "none" })).toEqual({ answered: 2.5 })
})

test("the same values handed in answer the same", () => {
  const asking = {
    terms: [{ of: "might", by: 2 }],
    constant: 1,
    rounding: "none" as const,
    held: { might: 3 },
  }
  expect(runMechanic(asking)).toEqual(runMechanic(asking))
})
