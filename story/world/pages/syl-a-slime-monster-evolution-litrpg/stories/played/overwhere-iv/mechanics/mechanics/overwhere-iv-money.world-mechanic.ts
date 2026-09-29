import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvMoney = {
  id: "01a0ed28-3fb2-79b5-9071-fc001faab75d",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-money",
  title: "Money",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Copper, silver and gold coin, and what things cost.",
} as const satisfies WorldMechanic
