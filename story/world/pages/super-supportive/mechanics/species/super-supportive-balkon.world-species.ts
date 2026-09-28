import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveBalkon = {
  id: "01a0e9f1-17d9-72a4-b406-47e549a88a80",
  type: "page-type/world-species",
  slug: "super-supportive-balkon",
  title: "Balkon",
  world: "world/super-supportive",
  description: "A domestic animal kept on ships.",
} as const satisfies WorldSpecies
