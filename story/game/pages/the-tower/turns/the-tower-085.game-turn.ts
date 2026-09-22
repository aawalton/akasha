import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const theTower085 = {
  id: "01a0c686-1c83-7480-b98a-507a10443391",
  type: "page-type/game-turn",
  slug: "the-tower-085",
  game: "game/the-tower",
  number: 85,
  windows: [{ kind: "level-up", level: 7 }],
} as const satisfies GameTurn
