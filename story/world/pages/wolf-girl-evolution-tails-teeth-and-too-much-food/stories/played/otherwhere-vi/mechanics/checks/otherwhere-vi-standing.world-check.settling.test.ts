import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/checks/otherwhere-vi-standing.world-check.settling.code.ts"

const AT = {
  character: "someone",
  kept: 2,
  heard: 1,
  shared: 0,
  gave: 1,
  crossed: 0,
  quotes: { kept: "she hauled the wood", heard: "go on, then", gave: "she handed over the trout" },
}

test("the four marks add up to the regard earned", () => {
  expect(settled(AT)).toEqual({ answered: { earned: 4, lost: 0, change: 4 } })
})

test("each line crossed costs three", () => {
  expect(settled({ ...AT, crossed: 1, quotes: { ...AT.quotes, crossed: "she lied" } })).toEqual({
    answered: { earned: 4, lost: 3, change: 1 },
  })
})

test("a mark above two is refused", () => {
  expect(settled({ ...AT, shared: 3 })).toHaveProperty("refused")
})

test("a mark above nought with no quote is refused", () => {
  expect(settled({ ...AT, quotes: { kept: "x" } })).toHaveProperty("refused")
})

test("a crossed line with no quote is refused", () => {
  expect(settled({ ...AT, crossed: 1 })).toHaveProperty("refused")
})

test("a reading naming no one is refused", () => {
  expect(settled({ ...AT, character: " " })).toHaveProperty("refused")
})
