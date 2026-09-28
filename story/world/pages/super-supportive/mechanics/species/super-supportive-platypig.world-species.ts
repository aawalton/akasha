import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportivePlatypig = {
  id: "01a0e9f9-c6a5-7a5d-b7e3-578febc33c3a",
  type: "page-type/world-species",
  slug: "super-supportive-platypig",
  title: "platypig",
  world: "world/super-supportive",
  description: "A pet alien like a guinea pig crossed with a platypus, which lays eggs.",
} as const satisfies WorldSpecies
