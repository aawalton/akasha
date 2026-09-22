import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const theTower080 = {
  id: "01a0c686-1c19-7994-9db4-711e73864660",
  type: "page-type/game-turn",
  slug: "the-tower-080",
  game: "game/the-tower",
  number: 80,
  windows: [{ kind: "affinity", name: "Force Affinity" }],
} as const satisfies GameTurn
