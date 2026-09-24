import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const physAttack = {
  id: "01a0c484-a779-7477-8c1c-7b4fc1b53077",
  type: "page-type/game-mechanic",
  slug: "phys-attack",
  definition: "a strike at the body, made with physical attack against physical defence",
  code: "ts",
} as const satisfies GameMechanic
