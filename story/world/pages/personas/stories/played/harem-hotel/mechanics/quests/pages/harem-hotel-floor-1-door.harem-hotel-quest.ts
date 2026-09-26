import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelFloor1Door = {
  id: "01a0de29-fd57-7893-9098-54bb6c7ed444",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-floor-1-door",
  title: "The Shut Door",
  character: "character-player/harem-hotel-alan",
  objective: "open the door at the dark end of the hall",
  status: "complete",
} as const satisfies HaremHotelQuest
