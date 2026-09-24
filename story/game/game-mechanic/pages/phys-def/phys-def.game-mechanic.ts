import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const physDef = {
  id: "01a0c479-75a4-7695-bf67-17df9f2ab9fe",
  type: "page-type/game-mechanic",
  slug: "phys-def",
  definition: "resistance to a blow, from vitality, finesse and the armour worn",
  code: "ts",
} as const satisfies GameMechanic
