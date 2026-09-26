import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-physical-attack.world-derived-metric.formula.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelMight } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/might/harem-hotel-might.page-type.ts"
import { haremHotelItemAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/item-attack/harem-hotel-item-attack.page-type.ts"

test("Alan striking with the keystone knife makes thirty eight", () => {
  const held = {
    [haremHotelMight.slug]: 12,
    [haremHotelFinesse.slug]: 15,
    [haremHotelItemAttack.slug]: 5,
  }
  expect(worked({ held })).toEqual({ answered: 38 })
})

test("a reading holding no weapon's attack is refused rather than summed", () => {
  const held = { [haremHotelMight.slug]: 12, [haremHotelFinesse.slug]: 15 }
  expect(worked({ held })).toHaveProperty("refused")
})
