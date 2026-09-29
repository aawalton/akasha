import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-harm.world-check.settling.code.ts"

const FOUR = { total: 4, crit: false, fumble: false }

const SIX = { total: 6, crit: true, fumble: false }

const ONE = { total: 1, crit: false, fumble: true }

test("a solid blow deals the die plus two", () => {
  expect(settled({ force: "solid", landed: "success", health: 20 }, FOUR)).toEqual({
    answered: { harm: 6, left: 14, down: false, beaten: false },
  })
})

test("a rending cut passes through any ward", () => {
  expect(settled({ force: "rending", landed: "success", ward: 6, health: 30 }, FOUR)).toEqual({
    answered: { harm: 16, left: 14, down: false, beaten: false },
  })
})

test("a strong blow deals three more", () => {
  expect(settled({ force: "light", landed: "strong", health: 10 }, FOUR)).toHaveProperty(
    "answered.harm",
    7
  )
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(settled({ force: "heavy", landed: "cost", health: 10 }, FOUR)).toHaveProperty(
    "answered.harm",
    4
  )
})

test("a blow that lands always deals at least one", () => {
  expect(settled({ force: "light", landed: "cost", ward: 6, health: 10 }, ONE)).toHaveProperty(
    "answered.harm",
    1
  )
})

test("a foe brought to nought is down", () => {
  expect(settled({ force: "crushing", landed: "success", health: 5 }, SIX)).toEqual({
    answered: { harm: 14, left: 0, down: true, beaten: false },
  })
})

test("a spared character is beaten back at one rather than downed", () => {
  expect(settled({ force: "crushing", landed: "strong", health: 8, spared: true }, SIX)).toEqual({
    answered: { harm: 17, left: 1, down: false, beaten: true },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(settled({ force: "solid", landed: "failure", health: 10 }, FOUR)).toHaveProperty("refused")
})

test("a blow with no health to land on is refused", () => {
  expect(settled({ force: "solid", landed: "success" }, FOUR)).toHaveProperty("refused")
})
