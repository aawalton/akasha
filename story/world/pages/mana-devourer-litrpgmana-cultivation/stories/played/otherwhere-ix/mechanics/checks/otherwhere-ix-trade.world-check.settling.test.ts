import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-trade.world-check.settling.code.ts"

const AT_THE_POST = { character: "otherwhere-ix-tamsin-rook" }

test("a wary seller asks the list price when nobody haggles", () => {
  expect(settled({ ...AT_THE_POST, listCopper: 160, regard: "wary", haggling: "none" })).toEqual({
    answered: { copper: 160, gold: 0, silver: 8, change: 0 },
  })
})

test("a friend who haggles well pays less", () => {
  expect(
    settled({ ...AT_THE_POST, listCopper: 400, regard: "friendly", haggling: "success" })
  ).toEqual({ answered: { copper: 324, gold: 0, silver: 16, change: 4 } })
})

test("a cold buyer asks half again, and a failed haggle more", () => {
  expect(
    settled({ ...AT_THE_POST, listCopper: 100, regard: "cold", haggling: "failure" })
  ).toHaveProperty("answered.copper", 165)
})

test("selling to someone who trusts her fetches more", () => {
  expect(
    settled({ ...AT_THE_POST, listCopper: 80, regard: "trusted", haggling: "none", selling: true })
  ).toHaveProperty("answered.copper", 100)
})

test("four hundred copper is a gold", () => {
  expect(settled({ ...AT_THE_POST, listCopper: 400, regard: "wary", haggling: "none" })).toEqual({
    answered: { copper: 400, gold: 1, silver: 0, change: 0 },
  })
})

test("an unknown regard is refused", () => {
  expect(
    settled({ ...AT_THE_POST, listCopper: 10, regard: "adoring", haggling: "none" })
  ).toHaveProperty("refused")
})
