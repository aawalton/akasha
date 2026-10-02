import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiOswinFairley = {
  id: "01a0fdd2-f70f-7892-98c4-54dbb68691c2",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-oswin-fairley",
  title: "Nala and Oswin Fairley",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-oswin-fairley",
  ],
  relationshipPoints: 4,
  unrevealed: true,
} as const satisfies WorldRelationship
