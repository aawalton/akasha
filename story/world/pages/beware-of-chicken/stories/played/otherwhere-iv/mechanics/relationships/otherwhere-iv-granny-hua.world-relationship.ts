import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereIvGrannyHua = {
  id: "01a0eb2b-240e-7cf8-be70-6dd479d2edc5",
  type: "page-type/world-relationship",
  slug: "otherwhere-iv-granny-hua",
  title: "Nala and Granny Hua",
  world: "world/beware-of-chicken",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-granny-hua"],
  relationshipPoints: 8,
  createdAt: "2026-09-29T03:17:48.174Z",
  updatedAt: "2026-09-29T04:06:28.000Z",
} as const satisfies WorldRelationship
