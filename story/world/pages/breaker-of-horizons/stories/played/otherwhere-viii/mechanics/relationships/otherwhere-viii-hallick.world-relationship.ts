import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiiHallick = {
  id: "01a0eabc-f42f-7e81-8a3a-179a9d35a063",
  type: "page-type/world-relationship",
  slug: "otherwhere-viii-hallick",
  title: "Nala and Hallick",
  world: "world/breaker-of-horizons",
  characters: ["character-player/otherwhere-viii-nala", "character-other/otherwhere-viii-hallick"],
  relationshipPoints: 7,
} as const satisfies WorldRelationship
