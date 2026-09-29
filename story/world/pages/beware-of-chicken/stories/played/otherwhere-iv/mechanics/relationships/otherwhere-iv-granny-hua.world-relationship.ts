import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereIvGrannyHua = {
  id: "01a0eb19-6110-70f2-b9d8-d139e5264acb",
  type: "page-type/world-relationship",
  slug: "otherwhere-iv-granny-hua",
  title: "Nala and Hua Su'e",
  world: "world/beware-of-chicken",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-granny-hua"],
  relationshipPoints: -2,
} as const satisfies WorldRelationship
