import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveRyehBtAnimal = {
  id: "01a0e9f1-17da-7aa4-bef4-8d79efc0b89b",
  type: "page-type/world-species",
  slug: "super-supportive-ryeh-bt-animal",
  title: "Ryeh-b't",
  world: "world/super-supportive",
  description: "A small flying reptile from Artona 3, a common Artonan pet.",
} as const satisfies WorldSpecies
