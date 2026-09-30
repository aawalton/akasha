import { expect, test } from "bun:test"
import { bandedSettled as settled } from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"

function rolled(total: number) {
  return { total, crit: total === 20, fumble: total === 1 }
}

test("an act meeting its target comes off", () => {
  expect(settled({ band: "standard" }, rolled(12))).toEqual({
    answered: { succeeded: true, outcome: "success", total: 12, target: 12, margin: 0 },
  })
})

test("every bonus an act earns is added to the die", () => {
  const act = {
    band: "hard",
    bonuses: [
      { from: "salt", by: 3 },
      { from: "dark", by: -1 },
    ],
  }
  expect(settled(act, rolled(14))).toMatchObject({ answered: { total: 16, margin: 0 } })
})

test("an act clearing its target by five or more comes off strongly", () => {
  expect(settled({ band: "easy" }, rolled(13))).toMatchObject({ answered: { outcome: "strong" } })
})

test("an act short by four or less comes off at a cost", () => {
  expect(settled({ band: "standard" }, rolled(8))).toMatchObject({
    answered: { succeeded: true, outcome: "cost", margin: -4 },
  })
})

test("an act short by five or more fails", () => {
  expect(settled({ band: "standard" }, rolled(7))).toMatchObject({
    answered: { succeeded: false, outcome: "failure", margin: -5 },
  })
})

test("a natural twenty comes off strongly whatever the margin", () => {
  expect(
    settled({ band: "extreme", bonuses: [{ from: "tired", by: -4 }] }, rolled(20))
  ).toMatchObject({ answered: { outcome: "strong", margin: -4 } })
})

test("a natural one fails whatever the margin", () => {
  const act = {
    band: "easy",
    bonuses: [
      { from: "a", by: 4 },
      { from: "b", by: 2 },
    ],
  }
  expect(settled(act, rolled(1))).toMatchObject({ answered: { outcome: "failure" } })
})

test("bonuses adding past six are refused", () => {
  const act = {
    band: "hard",
    bonuses: [
      { from: "a", by: 4 },
      { from: "b", by: 3 },
    ],
  }
  expect(settled(act, rolled(10))).toHaveProperty("refused")
})

test("a single bonus past four is refused", () => {
  expect(settled({ band: "hard", bonuses: [{ from: "a", by: 5 }] }, rolled(10))).toHaveProperty(
    "refused"
  )
})

test("a bonus naming no source is refused", () => {
  expect(settled({ band: "hard", bonuses: [{ from: " ", by: 1 }] }, rolled(10))).toHaveProperty(
    "refused"
  )
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "heroic" }, rolled(12))).toHaveProperty("refused")
})

test("an act handed no roll is refused, naming the dice to settle it with", () => {
  expect(settled({ band: "standard" }, null)).toEqual({
    refused: "an act is rolled, so settle it with --dice 1d20",
  })
})
