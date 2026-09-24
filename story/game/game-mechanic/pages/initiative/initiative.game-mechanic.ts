import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const initiative = {
  id: "01a0c479-1232-715f-b254-0cbe1f1c70d3",
  type: "page-type/game-mechanic",
  slug: "initiative",
  definition: "how early in a round someone acts, from perception and finesse",
  code: "ts",
} as const satisfies GameMechanic
