import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiMardaHesk = {
  id: "01a0f192-46df-79cf-adbc-8c38f3213807",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-marda-hesk",
  title: "Nala and Marda Hesk",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  relationshipPoints: 27,
  unrevealed: true,
} as const satisfies WorldRelationship
