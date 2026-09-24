import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const affinityLadder = {
  id: "01a0c48f-28df-7176-a92b-54c865098028",
  type: "page-type/game-mechanic",
  slug: "affinity-ladder",
  definition: "the four ranks an affinity climbs, from affinity to soul",
  code: "ts",
} as const satisfies GameMechanic
