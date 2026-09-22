import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mana-max.metric-derived.formula.code.ts"
import { towerIntellect } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-intellect/tower-intellect.page-type.ts"
import { towerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-will/tower-will.page-type.ts"

test("Alan's intellect of twenty and will of twenty make the hundred and twenty turn eighty-eight recorded", () => {
  const held = { [towerIntellect.slug]: 20, [towerWill.slug]: 20 }
  expect(worked({ held })).toEqual({ answered: 120 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [towerIntellect.slug]: 20 }
  expect(worked({ held })).toHaveProperty("refused")
})
