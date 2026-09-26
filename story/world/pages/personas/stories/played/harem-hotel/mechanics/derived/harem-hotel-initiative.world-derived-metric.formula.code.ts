import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelPerception } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/perception/harem-hotel-perception.page-type.ts"

export const worked = summingBy(
  [
    { of: haremHotelPerception.slug, by: 1 },
    { of: haremHotelFinesse.slug, by: 1 },
  ],
  0,
  "none"
)
