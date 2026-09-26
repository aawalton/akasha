import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/checks/partners-check.world-check.settling.code.ts"

const ONE = { total: 1, crit: false, fumble: true }
const SEVEN = { total: 7, crit: false, fumble: false }
const TWELVE = { total: 12, crit: false, fumble: false }

test("a twelve with Mind three and rank two clears a standard target by five", () => {
  expect(settled({ attribute: 3, rank: 2, band: "standard" }, TWELVE)).toEqual({
    answered: { succeeded: true, total: 17, target: 12, margin: 5 },
  })
})

test("every bonus an act earns is added to the die", () => {
  const act = { attribute: 1, rank: 2, band: "standard", bonuses: [{ from: "plan", by: 4 }] }
  expect(settled(act, SEVEN)).toMatchObject({ answered: { total: 14, margin: 2 } })
})

test("an act short of an easy target fails", () => {
  expect(settled({ attribute: 3, band: "easy" }, ONE)).toMatchObject({
    answered: { succeeded: false, margin: -4 },
  })
})

test("a band the game does not have is refused", () => {
  expect(settled({ attribute: 3, band: "heroic" }, TWELVE)).toHaveProperty("refused")
})
