import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-action-check.world-check.settling.code.ts"

const LEGACY = { from: "legacy affinity", by: 4 }

const MIDDLING = { total: 9, crit: false, fumble: false }

const LOW = { total: 2, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("her magic against a local beast comes off strongly on a middling roll", () => {
  expect(settled({ band: "easy", bonuses: [LEGACY] }, MIDDLING)).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("a low roll on an easy act with her legacy still comes off at a cost", () => {
  expect(settled({ band: "easy", bonuses: [LEGACY] }, LOW)).toHaveProperty(
    "answered.outcome",
    "cost"
  )
})

test("a natural one fails whatever the bonuses", () => {
  expect(settled({ band: "easy", bonuses: [LEGACY] }, NATURAL_ONE)).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("bonuses past six either way are refused", () => {
  expect(
    settled({ band: "hard", bonuses: [LEGACY, { from: "plan", by: 3 }] }, MIDDLING)
  ).toHaveProperty("refused")
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, MIDDLING)).toHaveProperty("refused")
})
