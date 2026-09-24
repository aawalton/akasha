import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const attributeCheck = {
  id: "01a0c49b-1a74-7301-908b-634e1e518907",
  type: "page-type/game-mechanic",
  slug: "attribute-check",
  definition: "whether a lethal or contested act outside combat comes off, and by how much",
  code: "ts",
} as const satisfies GameMechanic
