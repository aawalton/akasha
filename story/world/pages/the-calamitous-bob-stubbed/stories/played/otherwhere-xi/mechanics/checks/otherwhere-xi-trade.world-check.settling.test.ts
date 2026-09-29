import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-trade.world-check.settling.code.ts"

const NALA = "her"

test("a stranger pays a quarter more to buy", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "sandals", side: "buying", price: 10, regard: -2, offered: 10 }],
    })
  ).toEqual({ answered: { dealt: [{ what: "sandals", fair: 13, agreed: false }] } })
})

test("a friend sells to her a tenth cheaper", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "a cloak", side: "buying", price: 20, regard: 12, offered: 18 }],
    })
  ).toEqual({ answered: { dealt: [{ what: "a cloak", fair: 18, agreed: true }] } })
})

test("an eager buyer pays her more when she sells", () => {
  expect(
    settled({
      character: NALA,
      deals: [
        {
          what: "a glass globule",
          side: "selling",
          price: 60,
          regard: 0,
          want: "eager",
          offered: 66,
        },
      ],
    })
  ).toEqual({ answered: { dealt: [{ what: "a glass globule", fair: 66, agreed: true }] } })
})

test("a stranger selling to a wary buyer gets a quarter less", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "her shirt", side: "selling", price: 20, regard: -2, offered: 20 }],
    })
  ).toHaveProperty("answered.dealt.0.agreed", false)
})

test("a reading with no deal is refused", () => {
  expect(settled({ character: NALA, deals: [] })).toHaveProperty("refused")
})
