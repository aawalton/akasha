import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-harm.world-check.settling.code.ts"

const ONE = { total: 1, crit: false, fumble: true }

const TWO = { total: 2, crit: false, fumble: false }

const THREE = { total: 3, crit: false, fumble: false }

const FOUR = { total: 4, crit: false, fumble: false }

const SIX = { total: 6, crit: true, fumble: false }

test("a Surge blast at legacy rank one deals the die plus twelve", () => {
  expect(settled({ force: "starfall", landed: "success", left: 30, maxHealth: 30 }, THREE)).toEqual(
    { answered: { harm: 15, left: 15, wound: "hurt" } }
  )
})

test("a Surge blast rises four with each legacy rank", () => {
  expect(
    settled({ force: "starfall", rank: 3, landed: "success", left: 40, maxHealth: 40 }, ONE)
  ).toHaveProperty("answered.harm", 21)
})

test("a strong blow deals three more", () => {
  expect(
    settled({ force: "solid", landed: "strong", left: 40, maxHealth: 40 }, TWO)
  ).toHaveProperty("answered.harm", 7)
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(
    settled({ force: "heavy", landed: "cost", left: 40, maxHealth: 40 }, THREE)
  ).toHaveProperty("answered.harm", 4)
})

test("a crushing blow adds eight", () => {
  expect(
    settled({ force: "crushing", landed: "success", left: 40, maxHealth: 40 }, SIX)
  ).toHaveProperty("answered.harm", 14)
})

test("a ward takes from the blow, but a blow that lands deals at least one", () => {
  expect(
    settled({ force: "light", landed: "success", ward: 4, left: 40, maxHealth: 40 }, ONE)
  ).toHaveProperty("answered.harm", 1)
})

test("an ordinary foe's blow leaves Nala at the floor, beaten but alive", () => {
  expect(
    settled({ force: "crushing", landed: "success", left: 10, maxHealth: 40, floor: 1 }, SIX)
  ).toEqual({ answered: { harm: 9, left: 1, wound: "grievous" } })
})

test("at the floor already, an ordinary foe's blow takes nothing more", () => {
  expect(
    settled({ force: "heavy", landed: "strong", left: 1, maxHealth: 40, floor: 1 }, SIX)
  ).toEqual({ answered: { harm: 0, left: 1, wound: "grievous" } })
})

test("a floor below the harm changes nothing", () => {
  expect(
    settled({ force: "light", landed: "success", left: 40, maxHealth: 40, floor: 1 }, TWO)
  ).toEqual({ answered: { harm: 2, left: 38, wound: "whole" } })
})

test("with no floor the same blow takes a foe down", () => {
  expect(settled({ force: "crushing", landed: "success", left: 10, maxHealth: 40 }, SIX)).toEqual({
    answered: { harm: 14, left: 0, wound: "down" },
  })
})

test("a floor above the health left is refused", () => {
  expect(
    settled({ force: "solid", landed: "success", left: 3, maxHealth: 40, floor: 5 }, FOUR)
  ).toHaveProperty("refused")
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled({ force: "solid", landed: "failure", left: 40, maxHealth: 40 }, FOUR)
  ).toHaveProperty("refused")
})

test("a legacy rank past five is refused", () => {
  expect(
    settled({ force: "starfall", rank: 6, landed: "success", left: 40, maxHealth: 40 }, FOUR)
  ).toHaveProperty("refused")
})

test("health left past the most health is refused", () => {
  expect(
    settled({ force: "solid", landed: "success", left: 50, maxHealth: 40 }, FOUR)
  ).toHaveProperty("refused")
})

test("a force the check does not know is refused", () => {
  expect(
    settled({ force: "savage", landed: "success", left: 40, maxHealth: 40 }, FOUR)
  ).toHaveProperty("refused")
})
