import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const mentAttack = {
  id: "01a0c485-2172-7806-8a88-414c97b17724",
  type: "page-type/game-mechanic",
  slug: "ment-attack",
  definition: "a working on the mind, made with mental attack against mental defence",
  code: "ts",
} as const satisfies GameMechanic
