import { expect, test } from "bun:test"
import { derivedIn } from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { haremHotelHealthMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-health-max.world-derived-metric.ts"
import { haremHotelManaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mana-max.world-derived-metric.ts"
import { haremHotelStaminaMax } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-stamina-max.world-derived-metric.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelIntellect } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/intellect/harem-hotel-intellect.page-type.ts"
import { haremHotelMight } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/might/harem-hotel-might.page-type.ts"
import { HAREM_HOTEL_WORKINGS } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/modules/harem-hotel-derived-beside/harem-hotel-derived-beside.module.code.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"
import { haremHotelWill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/will/harem-hotel-will.page-type.ts"

test("the Harem Hotel's pools are worked by their formulas from the attributes", () => {
  const derived = derivedIn(
    {
      [haremHotelVitality.slug]: 10,
      [haremHotelMight.slug]: 12,
      [haremHotelFinesse.slug]: 15,
      [haremHotelIntellect.slug]: 18,
      [haremHotelWill.slug]: 18,
    },
    HAREM_HOTEL_WORKINGS
  )
  expect(derived[haremHotelHealthMax.title]).toBe(104)
  expect(derived[haremHotelManaMax.title]).toBe(108)
  expect(derived[haremHotelStaminaMax.title]).toBe(70)
})
