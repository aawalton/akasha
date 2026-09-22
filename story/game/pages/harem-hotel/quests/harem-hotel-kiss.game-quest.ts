import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelKiss = {
  id: "01a0c6ad-7b46-7af5-ac98-247e8b238074",
  type: "page-type/game-quest",
  slug: "harem-hotel-kiss",
  title: "The Kiss",
  game: "game/harem-hotel",
  objective: "kiss her",
  reward: "WILL +1",
  status: "complete",
} as const satisfies GameQuest
