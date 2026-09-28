import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"

export const otherwhereTheLibraryQuarters = {
  id: "01a0e836-4c63-7f9e-8a3f-6394e66ba43f",
  type: "page-type/otherwhere-i-room",
  slug: "otherwhere-the-library-quarters",
  title: "The Librarian's Quarters",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  place: "place/otherwhere-the-library-quarters",
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereIRoom
