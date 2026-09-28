import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveTerackerin = {
  id: "01a0e9fc-be83-7582-9749-2745f42396a9",
  type: "page-type/world-species",
  slug: "super-supportive-terackerin",
  title: "Terackerin",
  world: "world/super-supportive",
  description:
    "A rideable aquatic animal with a dark blue back, catfish-like head and paddle fins.",
} as const satisfies WorldSpecies
