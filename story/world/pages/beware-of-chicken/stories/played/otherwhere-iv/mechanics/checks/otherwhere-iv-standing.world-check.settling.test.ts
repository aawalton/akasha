import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/checks/otherwhere-iv-standing.world-check.settling.code.ts"

test("a turn with no marks and no crossed line moves nothing", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 0,
      heard: 0,
      shared: 0,
      gave: 0,
      crossed: 0,
      quotes: {},
    })
  ).toEqual({ answered: { earned: 0, lost: 0, change: 0 } })
})

test("the four marks add together", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 2,
      heard: 1,
      shared: 1,
      gave: 2,
      crossed: 0,
      quotes: {
        kept: "I said I would bring it back, and here it is.",
        heard: "Tell me what happened to the field.",
        shared: "I don't know where I am, truly.",
        gave: "Take the rest of the rice.",
      },
    })
  ).toEqual({ answered: { earned: 6, lost: 0, change: 6 } })
})

test("each crossed line costs three", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 1,
      heard: 0,
      shared: 0,
      gave: 0,
      crossed: 2,
      quotes: {
        kept: "I came back as I promised.",
        crossed: "She laughed at him before the village.",
      },
    })
  ).toEqual({ answered: { earned: 1, lost: 6, change: -5 } })
})

test("a mark above nought without its quote is refused", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 0,
      heard: 0,
      shared: 0,
      gave: 1,
      crossed: 0,
      quotes: {},
    })
  ).toHaveProperty("refused")
})

test("a crossed line without its quote is refused", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 0,
      heard: 0,
      shared: 0,
      gave: 0,
      crossed: 1,
      quotes: {},
    })
  ).toHaveProperty("refused")
})

test("a mark above two is refused", () => {
  expect(
    settled({
      character: "otherwhere-iv-nala",
      kept: 3,
      heard: 0,
      shared: 0,
      gave: 0,
      crossed: 0,
      quotes: { kept: "I keep my word." },
    })
  ).toHaveProperty("refused")
})
