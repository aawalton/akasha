import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"
import { haremHotelItemDefence } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/item-defence/harem-hotel-item-defence.page-type.ts"

export const worked = summingBy(
  [
    { of: haremHotelVitality.slug, by: 0.5 },
    { of: haremHotelFinesse.slug, by: 0.5 },
    { of: haremHotelItemDefence.slug, by: 1 },
  ],
  0,
  "none"
)
