import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLockedRoomPart2 = {
  id: "01a0d5f5-7767-74ce-b2ad-6ecf5a1412fd",
  type: "page-type/temper-lore-book",
  slug: "the-locked-room-part-2",
  title: "The Locked Room, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 823,
  bookIndex: 36,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 17 },
    { mapId: 12, mapCount: 18 },
    { mapId: 13, mapCount: 34 },
    { mapId: 27, mapCount: 13 },
  ],
} as const satisfies TemperLoreBook
