import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveGriveck = {
  id: "01a0e9f1-17da-7a0e-8ac3-54810d8392ed",
  type: "page-type/world-species",
  slug: "super-supportive-griveck",
  title: "Griveck",
  world: "world/super-supportive",
  aliases: ["grivek"],
  description: "Big hairless panther-like aliens with backward-bent joints.",
} as const satisfies WorldSpecies
