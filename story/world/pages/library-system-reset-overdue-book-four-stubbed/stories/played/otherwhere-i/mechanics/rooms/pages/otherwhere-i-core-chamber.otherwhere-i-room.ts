import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"

export const otherwhereICoreChamber = {
  id: "01a0e836-4c63-756a-a56e-9c3849160b22",
  type: "page-type/otherwhere-i-room",
  slug: "otherwhere-i-core-chamber",
  title: "The Core Chamber",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: true,
  place: "place/otherwhere-the-library-core-chamber",
  shownTo: ["character-player/otherwhere-i-alan"],
} as const satisfies OtherwhereIRoom
