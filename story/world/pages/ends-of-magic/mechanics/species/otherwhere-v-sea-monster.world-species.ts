import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVSeaMonster = {
  id: "01a0e9fa-0d16-748d-9d9d-66acb305f222",
  type: "page-type/world-species",
  slug: "otherwhere-v-sea-monster",
  title: "Sea Monster",
  world: "world/ends-of-magic",
  description: "Any ocean monster.",
} as const satisfies WorldSpecies
