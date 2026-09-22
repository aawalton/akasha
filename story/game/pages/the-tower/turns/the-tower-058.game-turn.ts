import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const theTower058 = {
  id: "01a0c686-1a16-78ab-814e-06ce0b3c5e2f",
  type: "page-type/game-turn",
  slug: "the-tower-058",
  game: "game/the-tower",
  number: 58,
  windows: [{ kind: "level-up", level: 5 }],
} as const satisfies GameTurn
