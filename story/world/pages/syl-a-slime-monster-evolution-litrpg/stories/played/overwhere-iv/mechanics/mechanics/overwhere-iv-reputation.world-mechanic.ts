import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvReputation = {
  id: "01a0ed28-3fb3-745a-8194-657a581f3b9a",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-reputation",
  title: "Reputation",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "What a town, a guild or a house says of a person who is not there.",
} as const satisfies WorldMechanic
