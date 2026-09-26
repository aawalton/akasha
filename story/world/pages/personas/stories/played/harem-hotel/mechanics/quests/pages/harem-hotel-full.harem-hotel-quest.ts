import type { HaremHotelQuest } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/quests/harem-hotel-quest.page-type.types.ts"

export const haremHotelFull = {
  id: "01a0de29-fd57-7705-834c-70e97c1d70cc",
  type: "page-type/harem-hotel-quest",
  slug: "harem-hotel-full",
  title: "Fully Hers",
  character: "character-player/harem-hotel-alan",
  objective: "give yourself to her fully",
  reward: "THE LINK — first activation",
  status: "complete",
} as const satisfies HaremHotelQuest
