import type { GameQuest } from "akasha/story/game/quest/game-quest.page-type.types.ts"

export const haremHotelFull = {
  id: "01a0c6ad-7b76-72d0-adba-54feb0e6f85c",
  type: "page-type/game-quest",
  slug: "harem-hotel-full",
  title: "Fully Hers",
  game: "game/harem-hotel",
  objective: "give yourself to her fully",
  reward: "THE LINK — first activation",
  status: "complete",
} as const satisfies GameQuest
