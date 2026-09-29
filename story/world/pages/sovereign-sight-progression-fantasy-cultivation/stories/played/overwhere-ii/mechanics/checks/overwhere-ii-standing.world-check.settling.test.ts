import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/checks/overwhere-ii-standing.world-check.settling.code.ts"

const AT_THE_FORD = {
  character: "wendle-ford",
  kept: 1,
  heard: 2,
  shared: 0,
  gave: 2,
  crossed: 0,
  quotes: {
    kept: "she came back as she said she would",
    heard: "half the ford saw the river turn",
    gave: "she pulled the miller's boy out of the race",
  },
}

test("the four marks add up to the regard earned", () => {
  expect(settled(AT_THE_FORD)).toEqual({ answered: { earned: 5, lost: 0, change: 5 } })
})

test("a lie found out crosses a line and costs three", () => {
  expect(
    settled({
      ...AT_THE_FORD,
      crossed: 1,
      quotes: { ...AT_THE_FORD.quotes, crossed: "they caught her in the lie" },
    })
  ).toEqual({ answered: { earned: 5, lost: 3, change: 2 } })
})

test("a mark above two is refused", () => {
  expect(settled({ ...AT_THE_FORD, gave: 3 })).toHaveProperty("refused")
})

test("a mark above nought with no quote is refused", () => {
  expect(settled({ ...AT_THE_FORD, quotes: { kept: "she came back" } })).toHaveProperty("refused")
})

test("a crossed line with no quote is refused", () => {
  expect(settled({ ...AT_THE_FORD, crossed: 1 })).toHaveProperty("refused")
})

test("a reading naming no place is refused", () => {
  expect(settled({ ...AT_THE_FORD, character: " " })).toHaveProperty("refused")
})
