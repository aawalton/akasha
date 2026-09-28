import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveIlket = {
  id: "01a0e9f9-c6a5-7ad6-aea7-d8f2ba122acc",
  type: "page-type/world-species",
  slug: "super-supportive-ilket",
  title: "ilket",
  world: "world/super-supportive",
  description: "A technologically advanced species that hates magic.",
} as const satisfies WorldSpecies
