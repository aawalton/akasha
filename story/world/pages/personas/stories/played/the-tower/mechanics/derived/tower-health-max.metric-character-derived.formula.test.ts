import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.metric-character-derived.formula.code.ts"
import { towerMight } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-might/tower-might.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"

test("vitality twelve and might fourteen make a hundred and twenty four", () => {
  const held = { [towerVitality.slug]: 12, [towerMight.slug]: 14 }
  expect(worked({ held })).toEqual({ answered: 124 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [towerVitality.slug]: 12 }
  expect(worked({ held })).toHaveProperty("refused")
})
