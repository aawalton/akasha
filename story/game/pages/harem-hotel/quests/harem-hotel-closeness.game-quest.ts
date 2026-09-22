import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelCloseness = {
  id: "01a0c6ad-7b01-75bb-a10d-dfc930b89d97",
  type: "page-type/game-quest",
  slug: "harem-hotel-closeness",
  title: "Closeness",
  game: "game/harem-hotel",
  objective: "close the distance between you",
  reward: "PRESENCE +1",
  status: "complete",
} as const satisfies GameQuest
