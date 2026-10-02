import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiHuwTarrant = {
  id: "01a0fd5d-e039-734a-b94d-e20ef2db1aea",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-huw-tarrant",
  title: "Nala and Huw Tarrant",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-huw-tarrant"],
  relationshipPoints: 3,
  unrevealed: true,
} as const satisfies WorldRelationship
