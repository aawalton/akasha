import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/checks/harem-hotel-attack-resolution.world-check.settling.code.ts"

const KNIFE = {
  attackPower: 38,
  defence: 30,
  baseDamage: 5,
  gate: 1,
  intent: 4,
  bonuses: [],
}

test("Alan's knife against a defence of thirty on a roll of eleven hits for fifteen", () => {
  expect(settled(KNIFE, { total: 11, crit: false, fumble: false })).toEqual({
    answered: {
      hit: true,
      band: "hit",
      gate: 1,
      intent: 4,
      margin: 23,
      effectiveScore: 53,
      damage: 15,
    },
  })
})

test("a fumble misses whatever the margin is", () => {
  const said = settled(KNIFE, { total: 11, crit: false, fumble: true })
  expect(said).toMatchObject({ answered: { hit: false, band: "fumble", damage: 0 } })
})

test("a reading missing what a strike reads is refused", () => {
  expect(settled({ attackPower: 38 }, { total: 11, crit: false, fumble: false })).toHaveProperty(
    "refused"
  )
})
