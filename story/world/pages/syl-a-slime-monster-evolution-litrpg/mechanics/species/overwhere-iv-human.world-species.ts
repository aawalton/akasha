import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const overwhereIvHuman = {
  id: "01a0ed2f-df55-70a4-8c47-2c803dbeaaa5",
  type: "page-type/world-species",
  slug: "overwhere-iv-human",
  title: "Human",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The commonest people: short-lived, quick to learn, and found in every town.",
} as const satisfies WorldSpecies
