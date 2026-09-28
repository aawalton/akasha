import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiEnnis = {
  id: "01a0ea44-6d8f-7012-83f8-8bd4691dd80c",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-ennis",
  title: "Nala and Ennis",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-ennis"],
  relationshipPoints: 0,
} as const satisfies WorldRelationship
