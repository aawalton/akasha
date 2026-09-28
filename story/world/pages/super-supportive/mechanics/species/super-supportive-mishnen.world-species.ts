import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveMishnen = {
  id: "01a0e9f1-17da-75f5-9129-09dbbd2a57bf",
  type: "page-type/world-species",
  slug: "super-supportive-mishnen",
  title: "Mishnen",
  world: "world/super-supportive",
  description: "A crocodile-like beast with tentacles instead of a tail.",
} as const satisfies WorldSpecies
