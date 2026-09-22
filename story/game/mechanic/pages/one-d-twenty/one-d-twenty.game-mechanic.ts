import type { GameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.types.ts"

export const oneDTwenty = {
  id: "01a0c482-0d5f-7ab4-ac37-d28f1b88c4c5",
  type: "page-type/game-mechanic",
  slug: "one-d-twenty",
  definition: "a die of twenty sides, swinging wider than the tower's usual handful",
  code: "ts",
} as const satisfies GameMechanic
