import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const theTower088 = {
  id: "01a0c686-1cbd-770e-af0c-2594765fca54",
  type: "page-type/game-turn",
  slug: "the-tower-088",
  game: "game/the-tower",
  number: 88,
  windows: [
    { kind: "item-award", name: "Clouded lens", note: "Recovered from: the Host's seat" },
    { kind: "item-award", name: "Woven-light mantle", note: "Recovered from: the Host's seat" },
  ],
} as const satisfies GameTurn
