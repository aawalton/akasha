import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/checks/overwhere-ii-action-check.world-check.settling.code.ts"

test("an ordinary attribute of six adds nothing", () => {
  expect(
    settled({ band: "easy", attribute: 6 }, { total: 8, crit: false, fumble: false })
  ).toHaveProperty("answered.total", 8)
})

test("Nala's Might of fourteen adds four", () => {
  expect(
    settled({ band: "easy", attribute: 14 }, { total: 8, crit: false, fumble: false })
  ).toHaveProperty("answered.total", 12)
})

test("a Talent at Surface counts as a skill of ten and adds two", () => {
  expect(
    settled({ band: "easy", skill: 10 }, { total: 8, crit: false, fumble: false })
  ).toHaveProperty("answered.total", 10)
})

test("an easy Talent act with her Might comes off strongly on a middling die", () => {
  expect(
    settled({ band: "easy", attribute: 14, skill: 10 }, { total: 7, crit: false, fumble: false })
  ).toHaveProperty("answered.outcome", "strong")
})

test("a weak attribute takes from the roll", () => {
  expect(
    settled({ band: "easy", attribute: 3 }, { total: 8, crit: false, fumble: false })
  ).toHaveProperty("answered.total", 6)
})

test("an attribute adds at most four", () => {
  expect(
    settled({ band: "easy", attribute: 40 }, { total: 8, crit: false, fumble: false })
  ).toHaveProperty("answered.total", 12)
})

test("a natural one fails however strong the attribute", () => {
  expect(
    settled({ band: "easy", attribute: 20 }, { total: 1, crit: false, fumble: true })
  ).toHaveProperty("answered.outcome", "failure")
})

test("a short margin of four or less comes off at a cost", () => {
  expect(
    settled({ band: "hard", attribute: 6 }, { total: 13, crit: false, fumble: false })
  ).toHaveProperty("answered.outcome", "cost")
})

test("an attribute that is no whole number is refused", () => {
  expect(
    settled({ band: "easy", attribute: 6.5 }, { total: 10, crit: false, fumble: false })
  ).toHaveProperty("refused")
})

test("a band the game does not have is refused", () => {
  expect(
    settled({ band: "trivial", attribute: 6 }, { total: 10, crit: false, fumble: false })
  ).toHaveProperty("refused")
})
