import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiHalDunmore = {
  id: "01a0f177-8422-7b5e-a533-fa829c59cc14",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-hal-dunmore",
  title: "Nala and Hal Dunmore",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-hal-dunmore"],
  relationshipPoints: 0,
  unrevealed: true,
} as const satisfies WorldRelationship
