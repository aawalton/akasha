import type { OtherwhereRoom } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere/mechanics/rooms/otherwhere-room.page-type.types.ts"

export const otherwhereHospitalWing = {
  id: "01a0e836-4c63-7e48-8e98-5c78e6fc1c2e",
  type: "page-type/otherwhere-room",
  slug: "otherwhere-hospital-wing",
  title: "The Hospital Wing",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  lit: false,
  place: "place/otherwhere-hospital-wing",
  shownTo: ["character-player/otherwhere-alan"],
} as const satisfies OtherwhereRoom
