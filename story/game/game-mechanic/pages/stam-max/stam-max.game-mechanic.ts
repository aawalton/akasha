import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const stamMax = {
  id: "01a0c477-926b-75cd-b514-037f558ef116",
  type: "page-type/game-mechanic",
  slug: "stam-max",
  definition: "the most a body spends on effort before tiring, from vitality and finesse",
  code: "ts",
} as const satisfies GameMechanic
