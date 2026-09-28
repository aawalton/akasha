import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveYumanit = {
  id: "01a0e9f9-c6a5-7fba-b382-6cd482679c4a",
  type: "page-type/world-species",
  slug: "super-supportive-yumanit",
  title: "Yumanit",
  world: "world/super-supportive",
  description: "A species with the concept of momentary names.",
} as const satisfies WorldSpecies
