import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiEddaCrane = {
  id: "01a0f41e-e5e2-7385-9011-8c3afb1f0249",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-edda-crane",
  title: "Nala and Edda Crane",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-edda-crane"],
  relationshipPoints: 3,
  unrevealed: true,
} as const satisfies WorldRelationship
