import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveOodee = {
  id: "01a0e9fc-be83-7c51-a9c5-2f928457ead4",
  type: "page-type/world-species",
  slug: "super-supportive-oodee",
  title: "O'odee",
  world: "world/super-supportive",
  description:
    "A farmed ostrich-like bird with long tendril tail feathers, known for its laugh-like calls.",
} as const satisfies WorldSpecies
