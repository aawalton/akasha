import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViBurr = {
  id: "01a0eacb-80b1-7a1c-b936-86064c2cbaf9",
  type: "page-type/world-relationship",
  slug: "otherwhere-vi-burr",
  title: "Nala and Burr",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  characters: ["character-player/otherwhere-vi-nala", "character-other/otherwhere-vi-burr"],
  relationshipPoints: -3,
  createdAt: "2026-09-29T01:33:20.433Z",
  updatedAt: "2026-09-29T01:33:23.000Z",
} as const satisfies WorldRelationship
