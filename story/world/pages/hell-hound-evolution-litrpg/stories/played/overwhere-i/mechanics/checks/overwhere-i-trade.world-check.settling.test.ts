import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-trade.world-check.settling.code.ts"

const NALA = "her"

test("a fair price at nought regard is the base, counted out in coin", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "a wool cloak", side: "buying", base: 40, offered: 40 }],
    })
  ).toEqual({
    answered: {
      dealt: [
        { what: "a wool cloak", price: 40, coins: { gold: 0, silver: 4, copper: 0 }, agreed: true },
      ],
    },
  })
})

test("a community cold to her charges a quarter more", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "a sword", side: "buying", base: 100, regard: -1, offered: 100 }],
    })
  ).toEqual({
    answered: {
      dealt: [
        { what: "a sword", price: 125, coins: { gold: 1, silver: 2, copper: 5 }, agreed: false },
      ],
    },
  })
})

test("trust and a strong bargain take two fifths off", () => {
  expect(
    settled({
      character: NALA,
      deals: [
        {
          what: "a sword",
          side: "buying",
          base: 100,
          regard: 3,
          bargain: "strong",
          offered: 60,
        },
      ],
    })
  ).toHaveProperty("answered.dealt.0.price", 60)
})

test("an eager buyer who welcomes her pays a fifth more for what she sells", () => {
  expect(
    settled({
      character: NALA,
      deals: [
        { what: "a wolf pelt", side: "selling", base: 50, regard: 1, want: "eager", offered: 60 },
      ],
    })
  ).toHaveProperty("answered.dealt.0.agreed", true)
})

test("a failed bargain costs her a tenth", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "bread", side: "buying", base: 20, bargain: "failure", offered: 20 }],
    })
  ).toHaveProperty("answered.dealt.0.price", 22)
})

test("a regard past five is refused", () => {
  expect(
    settled({
      character: NALA,
      deals: [{ what: "bread", side: "buying", base: 2, regard: 6, offered: 2 }],
    })
  ).toHaveProperty("refused")
})

test("a reading with no deal is refused", () => {
  expect(settled({ character: NALA, deals: [] })).toHaveProperty("refused")
})
