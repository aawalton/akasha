import type { HaremHotelAttributePoint } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/resources/attribute-point/harem-hotel-attribute-point.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de48-eff7-7a41-85cb-0ec105457014",
  type: "page-type/harem-hotel-attribute-point",
  slug: "harem-hotel-alan",
  character: "character-player/harem-hotel-alan",
  value: 0,
  minValue: 0,
} as const satisfies HaremHotelAttributePoint
