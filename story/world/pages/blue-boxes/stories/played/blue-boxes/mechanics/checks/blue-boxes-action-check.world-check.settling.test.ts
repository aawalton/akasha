import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/blue-boxes/stories/played/blue-boxes/mechanics/checks/blue-boxes-action-check.world-check.settling.code.ts"

const FAVOR = { from: "Iris's favor", by: 2 }

const ELEVEN = { total: 11, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

test("Iris's favor lifts a standard act just short into one that comes off", () => {
  expect(settled({ band: "standard", bonuses: [FAVOR] }, ELEVEN)).toHaveProperty(
    "answered.outcome",
    "success"
  )
})

test("the same act without her favor comes off at a cost", () => {
  expect(settled({ band: "standard" }, ELEVEN)).toHaveProperty("answered.outcome", "cost")
})

test("a natural one fails whatever Iris adds", () => {
  expect(settled({ band: "easy", bonuses: [FAVOR] }, NATURAL_ONE)).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, ELEVEN)).toHaveProperty("refused")
})
