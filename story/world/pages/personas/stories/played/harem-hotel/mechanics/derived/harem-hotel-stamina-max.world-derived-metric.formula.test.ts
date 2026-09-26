import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-stamina-max.world-derived-metric.formula.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"

test("vitality ten and finesse fifteen make seventy, as Alan's stamina stands", () => {
  const held = { [haremHotelVitality.slug]: 10, [haremHotelFinesse.slug]: 15 }
  expect(worked({ held })).toEqual({ answered: 70 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelFinesse.slug]: 15 }
  expect(worked({ held })).toHaveProperty("refused")
})
