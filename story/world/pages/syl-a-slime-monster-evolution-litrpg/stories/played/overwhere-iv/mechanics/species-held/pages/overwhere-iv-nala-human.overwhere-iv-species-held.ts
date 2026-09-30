import type { OverwhereIvSpeciesHeld } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/species-held/overwhere-iv-species-held.page-type.types.ts"

export const overwhereIvNalaHuman = {
  id: "01a0f1bb-30bc-7cba-b698-c6e78a7afbbc",
  type: "page-type/overwhere-iv-species-held",
  slug: "overwhere-iv-nala-human",
  title: "Human",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The commonest people: short-lived, quick to learn, and found in every town.",
  character: "character-player/overwhere-iv-nala",
  species: "world-species/overwhere-iv-human",
} as const satisfies OverwhereIvSpeciesHeld
