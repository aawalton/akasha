import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.types.ts"

export const otherwhereKitchen = {
  id: "01a0e836-4c63-71f8-998b-6e667bf417eb",
  type: "page-type/otherwhere-room",
  slug: "otherwhere-kitchen",
  title: "The Kitchen",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereRoom
