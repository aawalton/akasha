import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvBlueSlime = {
  id: "01a0ed2f-df53-7d25-aa66-1dba51a587fd",
  type: "page-type/world-species",
  slug: "overwhere-iv-blue-slime",
  title: "Blue Slime",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The commonest slime: a mindless blob of blue jelly around a small core.",
} as const satisfies WorldSpecies
