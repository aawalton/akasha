import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/rooms/otherwhere-room.page-type.types.ts"

export const otherwhereCoreChamber = {
  id: "01a0e836-4c63-756a-a56e-9c3849160b22",
  type: "page-type/otherwhere-room",
  slug: "otherwhere-core-chamber",
  title: "The Core Chamber",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  place: "place/otherwhere-core-chamber",
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereRoom
