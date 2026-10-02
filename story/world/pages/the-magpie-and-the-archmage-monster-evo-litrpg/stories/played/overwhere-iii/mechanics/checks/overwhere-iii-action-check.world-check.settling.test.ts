import { expect, test } from "bun:test"
import {
  settled,
  settledAt,
} from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-action-check.world-check.settling.code.ts"
import { overwhereIiiNalaManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/held/pages/overwhere-iii-nala-mana-weaver.overwhere-iii-trait-held.ts"

const WEAVER = { from: "Mana Weaver" }

const MIDDLING = { total: 12, crit: false, fumble: false }

const LOW = { total: 4, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("a working against a Wrenmark beast comes off strongly on a middling roll", () => {
  expect(settledAt({ band: "easy", bonuses: [WEAVER] }, MIDDLING, 1)).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("a low roll on an easy working still comes off at a cost", () => {
  expect(settledAt({ band: "easy", bonuses: [WEAVER] }, LOW, 1)).toHaveProperty(
    "answered.outcome",
    "cost"
  )
})

test("Mana Weaver at Legend adds five", () => {
  expect(settledAt({ band: "easy", bonuses: [WEAVER] }, LOW, 5)).toMatchObject({
    answered: { total: 9, margin: 1 },
  })
})

test("Mana Weaver named at her rank is taken", () => {
  expect(
    settledAt({ band: "easy", bonuses: [{ from: "Mana Weaver", by: 5 }] }, LOW, 5)
  ).toHaveProperty("answered.total", 9)
})

test("Mana Weaver named off her rank is refused", () => {
  expect(
    settledAt({ band: "easy", bonuses: [{ from: "Mana Weaver", by: 4 }] }, LOW, 5)
  ).toHaveProperty("refused")
})

test("the check reads her rank off her holding", () => {
  expect(settled({ band: "easy", bonuses: [WEAVER] }, MIDDLING)).toHaveProperty(
    "answered.total",
    MIDDLING.total + overwhereIiiNalaManaWeaver.rank
  )
})

test("Mana Weaver at Legend and a plan of two go past six and are refused", () => {
  expect(
    settledAt({ band: "easy", bonuses: [WEAVER, { from: "plan", by: 2 }] }, MIDDLING, 5)
  ).toHaveProperty("refused")
})

test("a natural one fails whatever the bonuses", () => {
  expect(settledAt({ band: "easy", bonuses: [WEAVER] }, NATURAL_ONE, 5)).toHaveProperty(
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
