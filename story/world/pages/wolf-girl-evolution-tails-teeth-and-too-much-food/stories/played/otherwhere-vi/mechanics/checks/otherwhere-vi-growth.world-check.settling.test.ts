import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/checks/otherwhere-vi-growth.world-check.settling.code.ts"

const START = { tier: 0, level: 1, cap: 10, progress: 0 }

test("a first rabbit lifts a new woman one level", () => {
  expect(
    settled({ ...START, gains: [{ kind: "kill", from: "a rabbit", tier: 0, level: 1 }] })
  ).toEqual({ answered: { gained: 5, levels: 1, level: 2, progress: 0, capped: false } })
})

test("a second kill is weighed against the level the first lifted her to", () => {
  expect(
    settled({
      ...START,
      gains: [
        { kind: "kill", from: "a rabbit", tier: 0, level: 1 },
        { kind: "kill", from: "a second rabbit", tier: 0, level: 1 },
      ],
    })
  ).toEqual({ answered: { gained: 9, levels: 1, level: 2, progress: 4, capped: false } })
})

test("prey far below her gives nothing", () => {
  expect(
    settled({
      ...START,
      level: 8,
      gains: [{ kind: "kill", from: "a rabbit", tier: 0, level: 1 }],
    })
  ).toHaveProperty("answered.gained", 0)
})

test("one kill gives at most twelve", () => {
  expect(
    settled({ ...START, gains: [{ kind: "kill", from: "a bear", tier: 1, level: 12 }] })
  ).toHaveProperty("answered.gained", 12)
})

test("a named monster gives three times over", () => {
  expect(
    settled({
      ...START,
      gains: [{ kind: "kill", from: "a named turtle", tier: 1, level: 5, named: true }],
    })
  ).toHaveProperty("answered.gained", 36)
})

test("a shared kill is split among those who shared it", () => {
  expect(
    settled({
      ...START,
      gains: [{ kind: "kill", from: "a wolf", tier: 0, level: 5, shared: 2 }],
    })
  ).toHaveProperty("answered.gained", 4)
})

test("a meal of strong meat gives a quarter of what its kill would", () => {
  expect(
    settled({ ...START, gains: [{ kind: "meal", from: "bear steak", tier: 1, level: 12 }] })
  ).toHaveProperty("answered.gained", 3)
})

test("levels stop at the cap and the rest is lost", () => {
  expect(
    settled({
      tier: 0,
      level: 9,
      cap: 10,
      progress: 10,
      gains: [{ kind: "kill", from: "a named turtle", tier: 1, level: 5, named: true }],
    })
  ).toEqual({ answered: { gained: 33, levels: 1, level: 10, progress: 0, capped: true } })
})

test("a Tier 1 level costs twice a Tier 0 level", () => {
  expect(
    settled({
      tier: 1,
      level: 1,
      cap: 25,
      progress: 0,
      gains: [{ kind: "feat", from: "a near death", points: 5 }],
    })
  ).toHaveProperty("answered.levels", 0)
})

test("a level past its cap is refused", () => {
  expect(
    settled({ ...START, level: 11, gains: [{ kind: "feat", from: "x", points: 1 }] })
  ).toHaveProperty("refused")
})

test("a reading with no gain is refused", () => {
  expect(settled({ ...START, gains: [] })).toHaveProperty("refused")
})
