import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvGoblin = {
  id: "01a0ed2f-df54-7e12-a028-63ecef521fa5",
  type: "page-type/world-species",
  slug: "overwhere-iv-goblin",
  title: "Goblin",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A small, green-skinned monster people that lives in tribes in the wilds.",
} as const satisfies WorldSpecies
