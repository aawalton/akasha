import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelFloor1Door = {
  id: "01a0c6ad-7b8d-7913-95b7-122a26da4604",
  type: "page-type/game-quest",
  slug: "harem-hotel-floor-1-door",
  title: "The Shut Door",
  game: "game/harem-hotel",
  objective: "open the door at the dark end of the hall",
  status: "complete",
} as const satisfies GameQuest
