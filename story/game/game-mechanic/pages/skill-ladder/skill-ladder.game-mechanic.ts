import type { GameMechanic } from "akasha/story/game/game-mechanic/game-mechanic.page-type.types.ts"

export const skillLadder = {
  id: "01a0c48e-95ea-7618-aaf3-4d427d447a4c",
  type: "page-type/game-mechanic",
  slug: "skill-ladder",
  definition: "the seven ranks a skill climbs, from novice to sage",
  code: "ts",
} as const satisfies GameMechanic
