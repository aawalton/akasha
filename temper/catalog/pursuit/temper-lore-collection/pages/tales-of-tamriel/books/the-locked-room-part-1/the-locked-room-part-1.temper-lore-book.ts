import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLockedRoomPart1 = {
  id: "01a0d5f5-7767-772f-9909-695493337b8c",
  type: "page-type/temper-lore-book",
  slug: "the-locked-room-part-1",
  title: "The Locked Room, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 822,
  bookIndex: 35,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 13 },
    { mapId: 10, mapCount: 23 },
    { mapId: 12, mapCount: 14 },
    { mapId: 13, mapCount: 7 },
    { mapId: 26, mapCount: 22 },
    { mapId: 27, mapCount: 10 },
    { mapId: 300, mapCount: 12 },
  ],
} as const satisfies TemperLoreBook
