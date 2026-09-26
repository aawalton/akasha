import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelFloor2Door = {
  id: "01a0de29-fd57-7d6e-b81c-23a81eca3d2e",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-floor-2-door",
  title: "The Far Door",
  character: "character-player/harem-hotel-alan",
  objective: "reach the shut door at the dark end of the second floor",
  status: "active",
} as const satisfies HaremHotelQuest
