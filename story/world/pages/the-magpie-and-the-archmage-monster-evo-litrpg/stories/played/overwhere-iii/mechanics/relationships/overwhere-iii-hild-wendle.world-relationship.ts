import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiHildWendle = {
  id: "01a0f409-6b23-7281-9c08-fe4ddf4366cb",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-hild-wendle",
  title: "Nala and Hild Wendle",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-hild-wendle"],
  relationshipPoints: 7,
  unrevealed: true,
} as const satisfies WorldRelationship
