import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMastersHall = {
  id: "01a0d5f6-6d42-71eb-915f-8556013189f1",
  type: "page-type/temper-lore-book",
  slug: "the-masters-hall",
  title: "The Masters' Hall",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2339,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 15 },
    { mapId: 10, mapCount: 5 },
    { mapId: 13, mapCount: 9 },
    { mapId: 16, mapCount: 9 },
    { mapId: 20, mapCount: 22 },
    { mapId: 26, mapCount: 6 },
    { mapId: 27, mapCount: 15 },
    { mapId: 125, mapCount: 23 },
    { mapId: 143, mapCount: 8 },
    { mapId: 255, mapCount: 16 },
    { mapId: 256, mapCount: 19 },
    { mapId: 660, mapCount: 5 },
    { mapId: 1060, mapCount: 7 },
    { mapId: 1126, mapCount: 11 },
  ],
} as const satisfies TemperLoreBook
