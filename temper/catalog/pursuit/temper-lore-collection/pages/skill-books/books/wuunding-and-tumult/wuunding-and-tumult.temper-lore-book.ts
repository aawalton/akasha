import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wuundingAndTumult = {
  id: "01a0d5f6-6d42-748a-91d5-51d78e44910f",
  type: "page-type/temper-lore-book",
  slug: "wuunding-and-tumult",
  title: "Wuunding and Tumult",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2225,
  bookIndex: 9,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 8 },
    { mapId: 10, mapCount: 52 },
    { mapId: 13, mapCount: 12 },
    { mapId: 16, mapCount: 5 },
    { mapId: 26, mapCount: 44 },
    { mapId: 27, mapCount: 6 },
    { mapId: 61, mapCount: 1 },
    { mapId: 125, mapCount: 2 },
    { mapId: 143, mapCount: 5 },
    { mapId: 255, mapCount: 33 },
    { mapId: 300, mapCount: 71 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 4 },
    { mapId: 1126, mapCount: 16 },
  ],
} as const satisfies TemperLoreBook
