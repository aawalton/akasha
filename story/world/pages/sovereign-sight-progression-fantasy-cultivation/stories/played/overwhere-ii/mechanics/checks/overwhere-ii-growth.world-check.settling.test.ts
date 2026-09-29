import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/checks/overwhere-ii-growth.world-check.settling.code.ts"

const NALA = "her"

test("an attribute rises for each run of days a quarter of its value long, and carries the rest", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "attribute", attribute: "Might", value: 14, earnestDays: 7 }],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "attribute", attribute: "Might", from: 14, to: 16, daysCarried: 1 }],
    },
  })
})

test("a low attribute takes at least one earnest day to rise", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "attribute", attribute: "Wits", value: 2, earnestDays: 3 }],
    })
  ).toHaveProperty("answered.grown.0.to", 5)
})

test("no Depth is reached without Descent, however many workings", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "depth", depth: "Surface", trials: 9, descended: false }],
    })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "depth",
          from: "Surface",
          to: "Surface",
          trialsNeeded: 5,
          reachAndDrawDoubled: false,
        },
      ],
    },
  })
})

test("Descent before enough workings reaches no Depth", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "depth", depth: "Surface", trials: 4, descended: true }],
    })
  ).toHaveProperty("answered.grown.0.to", "Surface")
})

test("Descent after enough workings reaches the next Depth and doubles reach and draw", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "depth", depth: "First Depth", trials: 10, descended: true }],
    })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "depth",
          from: "First Depth",
          to: "Second Depth",
          trialsNeeded: 10,
          reachAndDrawDoubled: true,
        },
      ],
    },
  })
})

test("an attribute this world does not keep is refused", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "attribute", attribute: "Charm", value: 10, earnestDays: 3 }],
    })
  ).toHaveProperty("refused")
})

test("a Depth reading with no word on Descent is refused", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "depth", depth: "Surface", trials: 5 }] })
  ).toHaveProperty("refused")
})

test("a reading with no gain is refused", () => {
  expect(settled({ character: NALA, gains: [] })).toHaveProperty("refused")
})
