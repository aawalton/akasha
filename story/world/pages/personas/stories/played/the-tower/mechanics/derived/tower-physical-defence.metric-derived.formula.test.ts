import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.metric-derived.formula.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"

test("Alan's vitality of twelve and finesse of fourteen unarmoured make thirteen", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14, "armor.def": 0 }
  expect(worked({ held })).toEqual({ answered: 13 })
})

test("armour carries its whole defence into the sum", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14, "armor.def": 5 }
  expect(worked({ held })).toEqual({ answered: 18 })
})

test("a reading holding no armour is refused rather than summed", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14 }
  expect(worked({ held })).toHaveProperty("refused")
})
