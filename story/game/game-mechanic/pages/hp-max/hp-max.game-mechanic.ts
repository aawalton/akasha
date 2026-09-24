import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const hpMax = {
  id: "01a0c477-486e-79f3-a44c-d01a3eb2446c",
  type: "page-type/game-mechanic",
  slug: "hp-max",
  definition: "the most damage a body takes before falling, from vitality and might",
  code: "ts",
} as const satisfies GameMechanic
