import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelCloseness = {
  id: "01a0de29-fd56-7163-b977-0b0e0d317800",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-closeness",
  title: "Closeness",
  character: "character-player/harem-hotel-alan",
  objective: "close the distance between you",
  reward: "PRESENCE +1",
  status: "complete",
} as const satisfies HaremHotelQuest
