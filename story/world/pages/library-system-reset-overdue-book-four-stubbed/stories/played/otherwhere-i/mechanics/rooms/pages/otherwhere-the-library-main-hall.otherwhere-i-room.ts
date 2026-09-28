import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"

export const otherwhereTheLibraryMainHall = {
  id: "01a0e836-4c63-7262-854b-46926e31bdb3",
  type: "page-type/otherwhere-i-room",
  slug: "otherwhere-the-library-main-hall",
  title: "The Main Hall",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  place: "place/otherwhere-the-library-main-hall",
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereIRoom
