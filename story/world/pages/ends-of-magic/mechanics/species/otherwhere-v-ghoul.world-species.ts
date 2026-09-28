import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVGhoul = {
  id: "01a0e9f9-9dd8-71b9-b46f-47757f6084cd",
  type: "page-type/world-species",
  slug: "otherwhere-v-ghoul",
  title: "Ghoul",
  world: "world/ends-of-magic",
  description: "A dreaded monster named in sayings of doom.",
} as const satisfies WorldSpecies
