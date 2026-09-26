import type { HaremHotelHealth } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/resources/health/harem-hotel-health.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de48-eff8-7b9d-accf-c96ac7a2002f",
  type: "page-type/harem-hotel-health",
  slug: "harem-hotel-alan",
  character: "character-player/harem-hotel-alan",
  value: 104,
  minValue: 0,
  maxValue: 104,
  history: "jsonl",
} as const satisfies HaremHotelHealth
