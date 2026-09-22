import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-defence.metric-character-derived.formula.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"
import { towerItemDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-defence/tower-item-defence.page-type.ts"

test("Alan's vitality of twelve and finesse of fourteen unarmoured make thirteen", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14, [towerItemDefence.slug]: 0 }
  expect(worked({ held })).toEqual({ answered: 13 })
})

test("Alan's stalker hide cloak at one carries its whole defence into the sum", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14, [towerItemDefence.slug]: 1 }
  expect(worked({ held })).toEqual({ answered: 14 })
})

test("a reading holding no armour is refused rather than summed", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14 }
  expect(worked({ held })).toHaveProperty("refused")
})
