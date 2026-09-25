import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ithguleoir = {
  id: "01a0d5f6-1c16-7269-b318-c49c2d5786c3",
  type: "page-type/temper-lore-book",
  slug: "ithguleoir",
  title: "Ithguleoir",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 825,
  bookIndex: 27,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 8 },
    { mapId: 12, mapCount: 5 },
    { mapId: 13, mapCount: 5 },
    { mapId: 27, mapCount: 3 },
    { mapId: 61, mapCount: 3 },
    { mapId: 994, mapCount: 4 },
    { mapId: 1006, mapCount: 10 },
    { mapId: 1060, mapCount: 20 },
    { mapId: 1349, mapCount: 11 },
    { mapId: 1429, mapCount: 5 },
  ],
} as const satisfies TemperLoreBook
