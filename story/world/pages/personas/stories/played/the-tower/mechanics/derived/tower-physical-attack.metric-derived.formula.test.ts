import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.metric-derived.formula.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerMight } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-might/tower-might.page-type.ts"

test("Alan's might of fourteen and finesse of fourteen bare-handed make thirty-five", () => {
  const held = { [towerMight.slug]: 14, [towerFinesse.slug]: 14, "weapon.atk": 0 }
  expect(worked({ held })).toEqual({ answered: 35 })
})

test("a weapon carries its whole attack into the sum", () => {
  const held = { [towerMight.slug]: 14, [towerFinesse.slug]: 14, "weapon.atk": 6 }
  expect(worked({ held })).toEqual({ answered: 41 })
})

test("a reading holding no weapon is refused rather than summed", () => {
  const held = { [towerMight.slug]: 14, [towerFinesse.slug]: 14 }
  expect(worked({ held })).toHaveProperty("refused")
})
