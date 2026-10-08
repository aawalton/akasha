import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiHild = {
  id: "01a0eace-724a-7ef5-b4ac-9acb486b976a",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-hild",
  title: "Nala and Hild",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-hild"],
  relationshipPoints: 4,
  createdAt: "2026-09-29T01:36:33.354Z",
  updatedAt: "2026-09-29T04:08:22.000Z",
} as const satisfies WorldRelationship
