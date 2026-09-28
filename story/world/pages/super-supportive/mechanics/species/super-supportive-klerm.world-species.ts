import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveKlerm = {
  id: "01a0e9f1-17da-75b2-b1ce-ac99c475a0c6",
  type: "page-type/world-species",
  slug: "super-supportive-klerm",
  title: "Klerm",
  world: "world/super-supportive",
  description: "A noisy frog-like animal with a shell.",
} as const satisfies WorldSpecies
