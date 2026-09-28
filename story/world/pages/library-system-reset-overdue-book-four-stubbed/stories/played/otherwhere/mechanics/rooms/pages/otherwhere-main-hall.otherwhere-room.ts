import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.types.ts"

export const otherwhereMainHall = {
  id: "01a0e836-4c63-7262-854b-46926e31bdb3",
  type: "page-type/otherwhere-room",
  slug: "otherwhere-main-hall",
  title: "The Main Hall",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereRoom
