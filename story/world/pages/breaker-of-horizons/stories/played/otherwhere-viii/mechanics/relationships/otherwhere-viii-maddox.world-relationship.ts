import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiiMaddox = {
  id: "01a0ea5d-1918-795f-95f3-7788bd42dbb8",
  type: "page-type/world-relationship",
  slug: "otherwhere-viii-maddox",
  title: "Nala and Maddox",
  world: "world/breaker-of-horizons",
  characters: ["character-player/otherwhere-viii-nala", "character-other/otherwhere-viii-maddox"],
  relationshipPoints: 3,
} as const satisfies WorldRelationship
