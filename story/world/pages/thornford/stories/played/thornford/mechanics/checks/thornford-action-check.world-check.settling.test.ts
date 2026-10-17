import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/thornford/stories/played/thornford/mechanics/checks/thornford-action-check.world-check.settling.code.ts"

const WORD = { from: "a clever word", by: 1 }

const ELEVEN = { total: 11, crit: false, fumble: false }

const NATURAL_ONE = { total: 1, crit: false, fumble: true }

const NATURAL_TWENTY = { total: 20, crit: true, fumble: false }

test("a clever word lifts a standard response just short into the one Nala hoped for", () => {
  expect(settled({ band: "standard", bonuses: [WORD] }, ELEVEN)).toHaveProperty(
    "answered.outcome",
    "as-hoped"
  )
})

test("the same response without the word is a twist", () => {
  expect(settled({ band: "standard" }, ELEVEN)).toHaveProperty("answered.outcome", "twist")
})

test("a natural one is a twist, never a failure", () => {
  expect(settled({ band: "easy", bonuses: [WORD] }, NATURAL_ONE)).toHaveProperty(
    "answered.outcome",
    "twist"
  )
})

test("a natural twenty is warm whatever the band", () => {
  expect(settled({ band: "extreme" }, NATURAL_TWENTY)).toHaveProperty("answered.outcome", "warm")
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial" }, ELEVEN)).toHaveProperty("refused")
})
