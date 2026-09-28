import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVUndead = {
  id: "01a0e9fb-482c-7e59-8460-13d14ca346b0",
  type: "page-type/world-species",
  slug: "otherwhere-v-undead",
  title: "Undead",
  world: "world/ends-of-magic",
  description: "A risen corpse or dead beast.",
} as const satisfies WorldSpecies
