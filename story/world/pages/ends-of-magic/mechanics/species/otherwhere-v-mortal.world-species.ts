import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVMortal = {
  id: "01a0e9f6-6b01-79ac-8272-ea841f217da6",
  type: "page-type/world-species",
  slug: "otherwhere-v-mortal",
  title: "Mortal",
  world: "world/ends-of-magic",
  description: "A thinking being without immortality.",
} as const satisfies WorldSpecies
