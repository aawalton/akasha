import type { GameTurn } from "akasha/story/game/game-turn/game-turn.page-type.types.ts"

export const haremHotel020 = {
  id: "01a0c6ab-656e-70ee-83d2-0a1b945b327d",
  type: "page-type/game-turn",
  slug: "harem-hotel-020",
  game: "story-game/harem-hotel",
  number: 20,
  pools: [
    { name: "mana", now: 108, most: 108 },
    { name: "health", now: 104, most: 104 },
    { name: "stamina", now: 70, most: 70 },
  ],
} as const satisfies GameTurn
