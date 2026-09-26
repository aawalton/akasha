import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mana-max.world-derived-metric.formula.code.ts"
import { haremHotelIntellect } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/intellect/harem-hotel-intellect.page-type.ts"
import { haremHotelWill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/will/harem-hotel-will.page-type.ts"

test("intellect eighteen and will eighteen make a hundred and eight, as Alan's mana stands", () => {
  const held = { [haremHotelIntellect.slug]: 18, [haremHotelWill.slug]: 18 }
  expect(worked({ held })).toEqual({ answered: 108 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelWill.slug]: 18 }
  expect(worked({ held })).toHaveProperty("refused")
})
