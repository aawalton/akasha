import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiAgnesHobb = {
  id: "01a0eb34-ec15-7baa-bc5a-c4fcf893d030",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-agnes-hobb",
  title: "Nala and Agnes Hobb",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-agnes-hobb"],
  relationshipPoints: 0,
} as const satisfies WorldRelationship
