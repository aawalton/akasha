import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereIvTieBo = {
  id: "01a0eae4-b5af-74a7-8fcb-f9057f768d06",
  type: "page-type/world-relationship",
  slug: "otherwhere-iv-tie-bo",
  title: "Nala and Tie Bo",
  world: "world/beware-of-chicken",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-tie-bo"],
  relationshipPoints: 4,
} as const satisfies WorldRelationship
