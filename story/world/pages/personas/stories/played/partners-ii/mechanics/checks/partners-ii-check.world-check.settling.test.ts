import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/checks/partners-ii-check.world-check.settling.code.ts"

const NINE = { total: 9, crit: false, fumble: false }

test("an act is judged against the target the game master sets", () => {
  expect(settled({ attribute: 2, rank: 1, target: 14 }, NINE)).toEqual({
    answered: { succeeded: false, total: 12, target: 14, margin: -2 },
  })
})

test("a bond's bonus is added like any other", () => {
  const act = { attribute: 2, target: 12, bonuses: [{ from: "bond", by: 1 }] }
  expect(settled(act, NINE)).toMatchObject({ answered: { succeeded: true, margin: 0 } })
})

test("a reading naming no target is refused", () => {
  expect(settled({ attribute: 2 }, NINE)).toHaveProperty("refused")
})
