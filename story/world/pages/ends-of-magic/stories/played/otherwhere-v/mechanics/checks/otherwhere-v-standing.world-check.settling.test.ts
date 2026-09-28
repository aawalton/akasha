import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/checks/otherwhere-v-standing.world-check.settling.code.ts"

test("marks add up, each quoting its words", () => {
  expect(
    settled({
      character: "otherwhere-v-woodcutter",
      kept: 1,
      heard: 0,
      helped: 2,
      tried: 1,
      crossed: 0,
      quotes: { kept: "she waited", helped: "she hauled logs", tried: "she said his word back" },
    })
  ).toEqual({ answered: { earned: 4, lost: 0, change: 4 } })
})

test("each line crossed costs three", () => {
  expect(
    settled({
      character: "otherwhere-v-woodcutter",
      kept: 0,
      heard: 1,
      helped: 0,
      tried: 0,
      crossed: 1,
      quotes: { heard: "she listened", crossed: "she took bread unasked" },
    })
  ).toEqual({ answered: { earned: 1, lost: 3, change: -2 } })
})

test("a mark with no words quoted is refused", () => {
  expect(
    settled({
      character: "otherwhere-v-woodcutter",
      kept: 2,
      heard: 0,
      helped: 0,
      tried: 0,
      crossed: 0,
      quotes: {},
    })
  ).toHaveProperty("refused")
})

test("a mark past two is refused", () => {
  expect(
    settled({
      character: "otherwhere-v-woodcutter",
      kept: 3,
      heard: 0,
      helped: 0,
      tried: 0,
      crossed: 0,
      quotes: { kept: "she waited" },
    })
  ).toHaveProperty("refused")
})
