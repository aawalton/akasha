import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelKiss = {
  id: "01a0de29-fd57-7693-a89d-2b92ed47a601",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-kiss",
  title: "The Kiss",
  character: "character-player/harem-hotel-alan",
  objective: "kiss her",
  reward: "WILL +1",
  status: "complete",
} as const satisfies HaremHotelQuest
