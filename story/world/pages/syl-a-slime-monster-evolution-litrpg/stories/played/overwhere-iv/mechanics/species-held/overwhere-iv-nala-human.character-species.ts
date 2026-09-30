import type { CharacterSpecies } from "akasha/story/world/mechanics/species/character-species/character-species.page-type.types.ts"

export const overwhereIvNalaHuman = {
  id: "01a0f1bb-30bc-7cba-b698-c6e78a7afbbc",
  type: "page-type/character-species",
  slug: "overwhere-iv-nala-human",
  title: "Human",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The commonest people: short-lived, quick to learn, and found in every town.",
  character: "character-player/overwhere-iv-nala",
  species: "world-species/overwhere-iv-human",
} as const satisfies CharacterSpecies
