import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiJoanReeve = {
  id: "01a0eaba-1ae0-7d42-b097-49a7a6f0cb84",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-joan-reeve",
  title: "Nala and Joan Reeve",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-joan-reeve"],
  relationshipPoints: 2,
} as const satisfies WorldRelationship
