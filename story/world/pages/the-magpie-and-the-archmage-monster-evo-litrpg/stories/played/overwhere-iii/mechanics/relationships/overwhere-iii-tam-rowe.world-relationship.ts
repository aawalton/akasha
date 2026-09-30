import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiTamRowe = {
  id: "01a0f41f-2c1b-70d0-b646-4d7e7882786d",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-tam-rowe",
  title: "Nala and Tam Rowe",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-tam-rowe"],
  relationshipPoints: 0,
  unrevealed: true,
} as const satisfies WorldRelationship
