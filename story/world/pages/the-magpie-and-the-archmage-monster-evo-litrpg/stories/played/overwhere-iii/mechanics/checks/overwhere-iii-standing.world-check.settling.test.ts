import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-standing.world-check.settling.code.ts"

const AT = {
  character: "the carter",
  kept: 2,
  heard: 1,
  shared: 0,
  shielded: 0,
  crossed: 0,
  quotes: { kept: "she paid for the ride", heard: ["go on, then", "tell me about the mule"] },
}

test("the marks add up to the standing earned", () => {
  expect(settled(AT)).toEqual({ answered: { earned: 3, lost: 0, change: 3 } })
})

test("shielding someone from harm earns standing too", () => {
  expect(
    settled({ ...AT, shielded: 2, quotes: { ...AT.quotes, shielded: "she stood over him" } })
  ).toHaveProperty("answered.earned", 5)
})

test("each line crossed costs two", () => {
  expect(settled({ ...AT, crossed: 2, quotes: { ...AT.quotes, crossed: "shut up" } })).toEqual({
    answered: { earned: 3, lost: 4, change: -1 },
  })
})

test("a mark above two is refused", () => {
  expect(settled({ ...AT, shared: 3 })).toHaveProperty("refused")
})

test("a mark above nought with no quote is refused", () => {
  expect(settled({ ...AT, quotes: { heard: "x" } })).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ ...AT, character: " " })).toHaveProperty("refused")
})
