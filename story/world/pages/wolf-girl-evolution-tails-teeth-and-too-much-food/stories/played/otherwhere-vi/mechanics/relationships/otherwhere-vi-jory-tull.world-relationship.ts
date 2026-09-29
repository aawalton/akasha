import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViJoryTull = {
  id: "01a0eacb-80b2-7b49-adcb-01577d85aa12",
  type: "page-type/world-relationship",
  slug: "otherwhere-vi-jory-tull",
  title: "Nala and Jory Tull",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  characters: ["character-player/otherwhere-vi-nala", "character-other/otherwhere-vi-jory-tull"],
  relationshipPoints: 4,
} as const satisfies WorldRelationship
