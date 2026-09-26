import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-defence.world-derived-metric.formula.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"
import { haremHotelItemDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/item-defence/harem-hotel-item-defence.page-type.ts"

test("Alan in the clothes he woke in makes twelve and a half", () => {
  const held = {
    [haremHotelVitality.slug]: 10,
    [haremHotelFinesse.slug]: 15,
    [haremHotelItemDefence.slug]: 0,
  }
  expect(worked({ held })).toEqual({ answered: 12.5 })
})

test("a reading holding no armour's defence is refused rather than summed", () => {
  const held = { [haremHotelVitality.slug]: 10, [haremHotelFinesse.slug]: 15 }
  expect(worked({ held })).toHaveProperty("refused")
})
