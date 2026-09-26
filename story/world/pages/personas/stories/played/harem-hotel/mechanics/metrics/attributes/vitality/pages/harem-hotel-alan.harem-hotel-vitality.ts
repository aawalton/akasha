import type { HaremHotelVitality } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/vitality/harem-hotel-vitality.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de4a-f4ac-7ec7-b050-2b2c2cfc07ad",
  type: "page-type/harem-hotel-vitality",
  slug: "harem-hotel-alan",
  character: "character-player/harem-hotel-alan",
  value: 10,
  history: "jsonl",
} as const satisfies HaremHotelVitality
