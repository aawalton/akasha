import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel001 = {
  id: "01a0c686-8d8c-7923-80be-76afbecb4203",
  type: "page-type/game-turn",
  slug: "harem-hotel-001",
  game: "game/harem-hotel",
  number: 1,
  windows: [{ kind: "status-assessment", name: "None", level: 1 }],
} as const satisfies GameTurn
