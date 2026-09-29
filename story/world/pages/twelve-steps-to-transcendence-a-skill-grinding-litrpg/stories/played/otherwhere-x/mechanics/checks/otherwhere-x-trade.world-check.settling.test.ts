import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-trade.world-check.settling.code.ts"

const AT_THE_MILL = { character: "otherwhere-x-pell-hollis" }

test("a wary seller asks the asked price when nobody haggles", () => {
  expect(settled({ ...AT_THE_MILL, askedCopper: 30, stance: "wary", haggle: "none" })).toEqual({
    answered: { copper: 30, gold: 0, silver: 3, looseCopper: 0 },
  })
})

test("a friend who haggles well pays less", () => {
  expect(
    settled({ ...AT_THE_MILL, askedCopper: 100, stance: "friendly", haggle: "success" })
  ).toHaveProperty("answered.copper", 81)
})

test("a cold dealer who sees her need asks far more", () => {
  expect(
    settled({ ...AT_THE_MILL, askedCopper: 10, stance: "cold", haggle: "none", needShown: true })
  ).toHaveProperty("answered.copper", 16)
})

test("selling to someone who trusts her fetches more", () => {
  expect(
    settled({ ...AT_THE_MILL, askedCopper: 40, stance: "trusting", haggle: "none", selling: true })
  ).toHaveProperty("answered.copper", 50)
})

test("two hundred copper is a gold", () => {
  expect(settled({ ...AT_THE_MILL, askedCopper: 200, stance: "wary", haggle: "none" })).toEqual({
    answered: { copper: 200, gold: 1, silver: 0, looseCopper: 0 },
  })
})

test("an unknown stance is refused", () => {
  expect(
    settled({ ...AT_THE_MILL, askedCopper: 10, stance: "smitten", haggle: "none" })
  ).toHaveProperty("refused")
})
