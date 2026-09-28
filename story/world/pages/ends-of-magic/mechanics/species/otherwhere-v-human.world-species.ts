import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVHuman = {
  id: "01a0e9f2-ad9e-78fd-9bb0-4ef14ed97ce8",
  type: "page-type/world-species",
  slug: "otherwhere-v-human",
  title: "Human",
  world: "world/ends-of-magic",
  description: "The most common thinking people of Davrar.",
} as const satisfies WorldSpecies
