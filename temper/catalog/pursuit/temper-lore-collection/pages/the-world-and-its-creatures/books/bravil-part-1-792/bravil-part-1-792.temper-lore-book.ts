import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bravilPart1792 = {
  id: "01a0d5f5-f3e3-7986-9df7-9622ec3640a6",
  type: "page-type/temper-lore-book",
  slug: "bravil-part-1-792",
  title: "Bravil,  Part 1",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 792,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 19 },
    { mapId: 7, mapCount: 35 },
    { mapId: 74, mapCount: 59 },
    { mapId: 75, mapCount: 2 },
    { mapId: 143, mapCount: 43 },
    { mapId: 201, mapCount: 5 },
    { mapId: 227, mapCount: 2 },
    { mapId: 258, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
