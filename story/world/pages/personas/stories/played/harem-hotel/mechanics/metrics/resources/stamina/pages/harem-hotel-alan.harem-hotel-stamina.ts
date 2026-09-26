import type { HaremHotelStamina } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/resources/stamina/harem-hotel-stamina.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de48-eff8-7404-b176-30d0ab28bbee",
  type: "page-type/harem-hotel-stamina",
  slug: "harem-hotel-alan",
  character: "character-player/harem-hotel-alan",
  value: 70,
  minValue: 0,
  maxValue: 70,
  history: "jsonl",
} as const satisfies HaremHotelStamina
