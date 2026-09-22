import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-defence.metric-character-derived.formula.code.ts"
import { towerIntellect } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-intellect/tower-intellect.page-type.ts"
import { towerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-will/tower-will.page-type.ts"

test("Alan's will of twenty and intellect of twenty make forty", () => {
  const held = { [towerWill.slug]: 20, [towerIntellect.slug]: 20 }
  expect(worked({ held })).toEqual({ answered: 40 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [towerWill.slug]: 20 }
  expect(worked({ held })).toHaveProperty("refused")
})
