import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereILinks = {
  id: "01a0e364-3bbd-77ae-910f-2230cc84f779",
  type: "page-type/world-relationship",
  slug: "otherwhere-i-links",
  title: "Nala and Links",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  relationshipPoints: 85,
} as const satisfies WorldRelationship
