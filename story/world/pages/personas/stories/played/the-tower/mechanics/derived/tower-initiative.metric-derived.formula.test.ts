import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-initiative.metric-derived.formula.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerPerception } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-perception/tower-perception.page-type.ts"

test("Alan's perception of twelve and finesse of fourteen make the twenty-six turn eighty-eight recorded", () => {
  const held = { [towerPerception.slug]: 12, [towerFinesse.slug]: 14 }
  expect(worked({ held })).toEqual({ answered: 26 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [towerPerception.slug]: 12 }
  expect(worked({ held })).toHaveProperty("refused")
})
