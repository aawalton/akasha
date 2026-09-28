import type { OtherwhereIRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/otherwhere-i-room.page-type.types.ts"

export const otherwhereIHospitalWing = {
  id: "01a0e836-4c63-7e48-8e98-5c78e6fc1c2e",
  type: "page-type/otherwhere-i-room",
  slug: "otherwhere-i-hospital-wing",
  title: "The Hospital Wing",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: false,
  place: "place/otherwhere-i-hospital-wing",
  shownTo: ["character-player/otherwhere-i-alan"],
} as const satisfies OtherwhereIRoom
