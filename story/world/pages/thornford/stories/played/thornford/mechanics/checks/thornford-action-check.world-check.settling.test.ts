import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/thornford/stories/played/thornford/mechanics/checks/thornford-action-check.world-check.settling.code.ts"

const TOOL = { from: "a fitting tool", by: 1 }

const ELEVEN = { total: 11, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("a fitting tool lifts a standard act just short into one that comes off", () => {
  expect(settled({ band: "standard", bonuses: [TOOL] }, ELEVEN)).toHaveProperty(
    "answered.outcome",
    "success"
  )
})

test("the same act without the tool comes off at a cost", () => {
  expect(settled({ band: "standard" }, ELEVEN)).toHaveProperty("answered.outcome", "cost")
})

test("a natural one fails whatever the bonuses", () => {
  expect(settled({ band: "easy", bonuses: [TOOL] }, NATURAL_ONE)).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, ELEVEN)).toHaveProperty("refused")
})
