import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const haremHotel005 = {
  id: "01a0c686-8dd0-750f-b5d9-4fd239805033",
  type: "page-type/game-turn",
  slug: "harem-hotel-005",
  game: "game/harem-hotel",
  number: 5,
  windows: [{ kind: "quest-offer", name: "Closeness", note: "close the distance between you." }],
} as const satisfies GameTurn
