import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-action-check.world-check.settling.code.ts"

test("an act meeting its target comes off", () => {
  expect(settled({ band: "standard" }, { total: 12, crit: false, fumble: false })).toMatchObject({
    answered: { outcome: "success", total: 12, target: 12, margin: 0 },
  })
})

test("a first-week body and bare feet cost three on a sprint over paving", () => {
  const reading = {
    band: "standard",
    bonuses: [
      { from: "unfamiliar body", by: -2 },
      { from: "bare feet on paving", by: -1 },
    ],
  }
  expect(settled(reading, { total: 12, crit: false, fumble: false })).toMatchObject({
    answered: { outcome: "cost", total: 9, margin: -3 },
  })
})

test("a glyph sequence held in the mind costs two", () => {
  const reading = { band: "easy", bonuses: [{ from: "mental glyph sequence", by: -2 }] }
  expect(settled(reading, { total: 4, crit: false, fumble: false })).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("a fitting work clearing the target by five comes off strongly", () => {
  const reading = { band: "hard", bonuses: [{ from: "control", by: 2 }] }
  expect(settled(reading, { total: 19, crit: false, fumble: false })).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("a natural one fails whatever the margin", () => {
  const reading = { band: "easy", bonuses: [{ from: "control", by: 4 }] }
  expect(settled(reading, { total: 1, crit: false, fumble: true })).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("a natural twenty comes off strongly against an extreme lie about papers", () => {
  expect(settled({ band: "extreme" }, { total: 20, crit: true, fumble: false })).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("bonuses past six either way are refused", () => {
  const reading = {
    band: "standard",
    bonuses: [
      { from: "unfamiliar body", by: -2 },
      { from: "overdrawn", by: -3 },
      { from: "grievous", by: -3 },
    ],
  }
  expect(settled(reading, { total: 10, crit: false, fumble: false })).toHaveProperty("refused")
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, { total: 10, crit: false, fumble: false })).toHaveProperty(
    "refused"
  )
})
