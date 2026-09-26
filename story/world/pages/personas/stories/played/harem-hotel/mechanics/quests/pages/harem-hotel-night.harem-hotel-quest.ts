import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelNight = {
  id: "01a0de29-fd57-7c9e-8169-077363c3bc7b",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-night",
  title: "The Night",
  character: "character-player/harem-hotel-alan",
  objective: "take her to bed",
  reward: "VITALITY +1",
  status: "complete",
} as const satisfies HaremHotelQuest
