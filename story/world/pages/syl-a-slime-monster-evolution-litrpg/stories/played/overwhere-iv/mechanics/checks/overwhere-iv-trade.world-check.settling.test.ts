import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-trade.world-check.settling.code.ts"

const HIGH = { total: 18, crit: false, fumble: false }

const MIDDLING = { total: 12, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("a strong haggle buys at four fifths of the asking price", () => {
  expect(settled({ band: "standard", listPrice: 30, selling: false }, HIGH)).toEqual({
    answered: { outcome: "strong", price: 24 },
  })
})

test("a plain success sells for a tenth more", () => {
  expect(settled({ band: "standard", listPrice: 50, selling: true }, MIDDLING)).toEqual({
    answered: { outcome: "success", price: 55 },
  })
})

test("a failed haggle makes no deal", () => {
  expect(settled({ band: "standard", listPrice: 50, selling: true }, NATURAL_ONE)).toEqual({
    answered: { outcome: "failure", price: null },
  })
})

test("a deal with no price is refused", () => {
  expect(settled({ band: "standard", selling: true }, MIDDLING)).toHaveProperty("refused")
})
