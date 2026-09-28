import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveArtonan = {
  id: "01a0e9f1-17d9-7555-ac9f-b3f660f1f4e4",
  type: "page-type/world-species",
  slug: "super-supportive-artonan",
  title: "Artonan",
  world: "world/super-supportive",
  aliases: ["space wizards"],
  description: "The aliens of the Triplanets.",
} as const satisfies WorldSpecies
