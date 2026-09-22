import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-stamina-max.metric-character-derived.formula.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"

test("Alan's vitality of twelve and finesse of fourteen make the seventy-six turn eighty-eight recorded", () => {
  const held = { [towerVitality.slug]: 12, [towerFinesse.slug]: 14 }
  expect(worked({ held })).toEqual({ answered: 76 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [towerVitality.slug]: 12 }
  expect(worked({ held })).toHaveProperty("refused")
})
