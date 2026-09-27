import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereLinks = {
  id: "01a0e364-3bbd-77ae-910f-2230cc84f779",
  type: "page-type/world-relationship",
  slug: "otherwhere-links",
  title: "Alan and Links",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  relationshipPoints: 17,
} as const satisfies WorldRelationship
