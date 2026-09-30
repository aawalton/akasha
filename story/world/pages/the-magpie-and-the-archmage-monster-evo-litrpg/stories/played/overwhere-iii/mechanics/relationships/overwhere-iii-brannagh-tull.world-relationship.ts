import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiBrannaghTull = {
  id: "01a0f352-988b-7a7b-aaed-9662db8622d4",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-brannagh-tull",
  title: "Nala and Brannagh Tull",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
  ],
  relationshipPoints: 9,
  unrevealed: true,
} as const satisfies WorldRelationship
