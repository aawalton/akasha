import type { HaremHotelMana } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/resources/mana/harem-hotel-mana.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de48-eff8-745f-905d-74d2e5f37aae",
  type: "page-type/harem-hotel-mana",
  slug: "harem-hotel-alan",
  character: "character-player/harem-hotel-alan",
  value: 108,
  minValue: 0,
  maxValue: 108,
  history: "jsonl",
} as const satisfies HaremHotelMana
