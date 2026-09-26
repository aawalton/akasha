import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-health-max.world-derived-metric.formula.code.ts"
import { haremHotelMight } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/might/harem-hotel-might.page-type.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"

test("vitality ten and might twelve make a hundred and four, as Alan's health stands", () => {
  const held = { [haremHotelVitality.slug]: 10, [haremHotelMight.slug]: 12 }
  expect(worked({ held })).toEqual({ answered: 104 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelVitality.slug]: 10 }
  expect(worked({ held })).toHaveProperty("refused")
})
