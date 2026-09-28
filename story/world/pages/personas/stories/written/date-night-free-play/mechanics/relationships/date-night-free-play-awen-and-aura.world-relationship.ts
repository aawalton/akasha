import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const dateNightFreePlayAwenAndAura = {
  id: "01a0decf-4151-798a-986b-43a65950811d",
  type: "page-type/world-relationship",
  slug: "date-night-free-play-awen-and-aura",
  title: "Awen and Aura",
  world: "world/personas",
  characters: [
    "character-other/date-night-free-play-awen",
    "character-other/date-night-free-play-aura",
  ],
} as const satisfies WorldRelationship
