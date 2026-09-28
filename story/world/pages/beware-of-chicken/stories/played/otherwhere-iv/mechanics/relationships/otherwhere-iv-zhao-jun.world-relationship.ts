import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereIvZhaoJun = {
  id: "01a0ea18-d5f2-769d-9f8b-b598e8c1bfee",
  type: "page-type/world-relationship",
  slug: "otherwhere-iv-zhao-jun",
  title: "Nala and Zhao Jun",
  world: "world/beware-of-chicken",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-zhao-jun"],
  relationshipPoints: 9,
} as const satisfies WorldRelationship
