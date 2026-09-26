import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-defence.world-derived-metric.formula.code.ts"
import { haremHotelIntellect } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/intellect/harem-hotel-intellect.page-type.ts"
import { haremHotelWill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/will/harem-hotel-will.page-type.ts"

test("will eighteen and intellect eighteen make thirty six, as Alan's mental defence stands", () => {
  const held = { [haremHotelWill.slug]: 18, [haremHotelIntellect.slug]: 18 }
  expect(worked({ held })).toEqual({ answered: 36 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelWill.slug]: 18 }
  expect(worked({ held })).toHaveProperty("refused")
})
