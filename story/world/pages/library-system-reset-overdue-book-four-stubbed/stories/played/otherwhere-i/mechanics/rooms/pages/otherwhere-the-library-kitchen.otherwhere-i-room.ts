import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"

export const otherwhereTheLibraryKitchen = {
  id: "01a0e836-4c63-71f8-998b-6e667bf417eb",
  type: "page-type/otherwhere-i-room",
  slug: "otherwhere-the-library-kitchen",
  title: "The Kitchen",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  place: "place/otherwhere-the-library-kitchen",
  shownTo: ["character-player/otherwhere-i-alan"],
} as const satisfies OtherwhereIRoom
