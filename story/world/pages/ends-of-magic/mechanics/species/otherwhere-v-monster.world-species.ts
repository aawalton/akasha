import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVMonster = {
  id: "01a0e9f8-36f3-7f38-ae84-18bd7bdc7a5d",
  type: "page-type/world-species",
  slug: "otherwhere-v-monster",
  title: "Monster",
  world: "world/ends-of-magic",
  description: "Any of Davrar's many dangerous, often magical wild beasts.",
} as const satisfies WorldSpecies
