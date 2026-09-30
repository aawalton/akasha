import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiMotherSallow = {
  id: "01a0f4a4-ca20-73cc-8cd2-d9c8b4b7b388",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-mother-sallow",
  title: "Nala and Mother Sallow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-mother-sallow",
  ],
  relationshipPoints: 0,
  unrevealed: true,
} as const satisfies WorldRelationship
