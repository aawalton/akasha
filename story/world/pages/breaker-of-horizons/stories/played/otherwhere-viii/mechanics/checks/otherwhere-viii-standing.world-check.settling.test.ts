import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-standing.world-check.settling.code.ts"

test("marks add up, each quoting its words", () => {
  expect(
    settled({
      character: "otherwhere-viii-warden",
      kept: 1,
      heard: 2,
      helped: 0,
      respected: 1,
      crossed: 0,
      quotes: { kept: "she stayed put", heard: "she let him finish", respected: "she stood up" },
    })
  ).toEqual({ answered: { earned: 4, lost: 0, change: 4 } })
})

test("each line crossed costs three", () => {
  expect(
    settled({
      character: "otherwhere-viii-warden",
      kept: 0,
      heard: 1,
      helped: 0,
      respected: 0,
      crossed: 1,
      quotes: { heard: "she listened", crossed: "she ran from him" },
    })
  ).toEqual({ answered: { earned: 1, lost: 3, change: -2 } })
})

test("a mark with no words quoted is refused", () => {
  expect(
    settled({
      character: "otherwhere-viii-warden",
      kept: 0,
      heard: 0,
      helped: 2,
      respected: 0,
      crossed: 0,
      quotes: {},
    })
  ).toHaveProperty("refused")
})

test("a mark past two is refused", () => {
  expect(
    settled({
      character: "otherwhere-viii-warden",
      kept: 0,
      heard: 0,
      helped: 0,
      respected: 3,
      crossed: 0,
      quotes: { respected: "she bowed" },
    })
  ).toHaveProperty("refused")
})
