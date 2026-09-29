import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-action-check.world-check.settling.code.ts"

const WEAVER = { from: "Mana Weaver", by: 1 }

const MIDDLING = { total: 12, crit: false, fumble: false }

const LOW = { total: 4, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("a working against a Wrenmark beast comes off strongly on a middling roll", () => {
  expect(settled({ band: "easy", bonuses: [WEAVER] }, MIDDLING)).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("a low roll on an easy working still comes off at a cost", () => {
  expect(settled({ band: "easy", bonuses: [WEAVER] }, LOW)).toHaveProperty(
    "answered.outcome",
    "cost"
  )
})

test("a natural one fails whatever the bonuses", () => {
  expect(settled({ band: "easy", bonuses: [WEAVER] }, NATURAL_ONE)).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("bonuses past six either way are refused", () => {
  expect(
    settled(
      {
        band: "hard",
        bonuses: [
          { from: "plan", by: 4 },
          { from: "help", by: 3 },
        ],
      },
      MIDDLING
    )
  ).toHaveProperty("refused")
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, MIDDLING)).toHaveProperty("refused")
})
