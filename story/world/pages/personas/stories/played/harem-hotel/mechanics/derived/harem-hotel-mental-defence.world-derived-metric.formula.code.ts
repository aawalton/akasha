import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { haremHotelIntellect } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/intellect/harem-hotel-intellect.page-type.ts"
import { haremHotelWill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/will/harem-hotel-will.page-type.ts"

export const worked = summingBy(
  [
    { of: haremHotelWill.slug, by: 1.5 },
    { of: haremHotelIntellect.slug, by: 0.5 },
  ],
  0,
  "none"
)
