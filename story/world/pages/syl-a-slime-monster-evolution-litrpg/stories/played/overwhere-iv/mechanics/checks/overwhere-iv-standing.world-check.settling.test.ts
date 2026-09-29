import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-standing.world-check.settling.code.ts"

test("marks add up to the standing earned", () => {
  expect(
    settled({
      character: "garrett",
      kept: 1,
      heard: 2,
      shared: 0,
      helped: 2,
      crossed: 0,
      quotes: {
        kept: "I'll pay you back.",
        heard: "Tell me about the mill.",
        helped: "she lifts the sack",
      },
    })
  ).toEqual({ answered: { earned: 5, lost: 0, change: 5 } })
})

test("each line crossed costs two", () => {
  expect(
    settled({
      character: "hale",
      kept: 0,
      heard: 1,
      shared: 0,
      helped: 0,
      crossed: 1,
      quotes: { heard: "Go on.", crossed: "she lies to the captain" },
    })
  ).toEqual({ answered: { earned: 1, lost: 2, change: -1 } })
})

test("a mark with no words behind it is refused", () => {
  expect(
    settled({ character: "ilsa", kept: 0, heard: 1, shared: 0, helped: 0, crossed: 0, quotes: {} })
  ).toHaveProperty("refused")
})
