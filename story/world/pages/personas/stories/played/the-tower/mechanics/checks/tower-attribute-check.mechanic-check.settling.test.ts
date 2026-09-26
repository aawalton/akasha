import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-attribute-check.mechanic-check.settling.code.ts"

const ACT = { attribute: 11, difficulty: 24, intent: 4 }

function rolled(total: number) {
  return { total, crit: false, fumble: false }
}

test("an act clearing its difficulty comes off as a hit", () => {
  expect(settled(ACT, rolled(12))).toEqual({
    answered: {
      hit: true,
      band: "hit",
      gate: 1,
      intent: 4,
      margin: 3,
      effectiveScore: 27,
      damage: 1,
    },
  })
})

test("an act short of its difficulty by less than three comes off at a cost", () => {
  expect(settled(ACT, rolled(7))).toMatchObject({ answered: { band: "graze", hit: true } })
})

test("an act short of its difficulty by three or more fails", () => {
  expect(settled(ACT, rolled(5))).toMatchObject({ answered: { band: "miss", hit: false } })
})

test("a fumble fails whatever the margin is", () => {
  const roll = { total: 2, crit: false, fumble: true }
  expect(settled({ ...ACT, attribute: 40 }, roll)).toMatchObject({ answered: { band: "fumble" } })
})

test("a reading naming no difficulty is refused", () => {
  expect(settled({ attribute: 11, intent: 4 }, rolled(12))).toHaveProperty("refused")
})
