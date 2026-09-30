import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViWat = {
  id: "01a0eacb-80b2-7e27-a145-92fec542d7b7",
  type: "page-type/world-relationship",
  slug: "otherwhere-vi-wat",
  title: "Nala and Old Wat",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  characters: ["character-player/otherwhere-vi-nala", "character-other/otherwhere-vi-wat"],
  relationshipPoints: 4,
} as const satisfies WorldRelationship
