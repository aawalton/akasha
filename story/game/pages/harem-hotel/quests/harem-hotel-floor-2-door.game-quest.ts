import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelFloor2Door = {
  id: "01a0c6ad-7ba2-7649-a1fd-dd41e5423b31",
  type: "page-type/game-quest",
  slug: "harem-hotel-floor-2-door",
  title: "The Far Door",
  game: "game/harem-hotel",
  objective: "reach the shut door at the dark end of the second floor",
  status: "active",
} as const satisfies GameQuest
