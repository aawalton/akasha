import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { haremHotelMight } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/might/harem-hotel-might.page-type.ts"
import { haremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.ts"

export const worked = summingBy(
  [
    { of: haremHotelVitality.slug, by: 8 },
    { of: haremHotelMight.slug, by: 2 },
  ],
  0,
  "nearest"
)
