import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelMight } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/might/harem-hotel-might.page-type.ts"
import { haremHotelItemAttack } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/item-attack/harem-hotel-item-attack.page-type.ts"

export const worked = summingBy(
  [
    { of: haremHotelMight.slug, by: 1.5 },
    { of: haremHotelFinesse.slug, by: 1 },
    { of: haremHotelItemAttack.slug, by: 1 },
  ],
  0,
  "none"
)
