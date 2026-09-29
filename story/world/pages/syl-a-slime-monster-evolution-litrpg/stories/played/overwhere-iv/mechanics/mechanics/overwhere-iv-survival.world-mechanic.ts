import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvSurvival = {
  id: "01a0ed28-3fb3-7d91-a8d9-08b474843614",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-survival",
  title: "Survival",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "What a body needs to keep going: food, water, sleep, warmth and shelter.",
} as const satisfies WorldMechanic
