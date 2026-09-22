import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelNight = {
  id: "01a0c6ad-7b60-7fc5-8359-e80a4e4de720",
  type: "page-type/game-quest",
  slug: "harem-hotel-night",
  title: "The Night",
  game: "game/harem-hotel",
  objective: "take her to bed",
  reward: "VITALITY +1",
  status: "complete",
} as const satisfies GameQuest
