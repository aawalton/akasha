import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bliss = {
  id: "01a0d5f6-6d3f-72e9-b349-9095ab2101f0",
  type: "page-type/temper-lore-book",
  slug: "bliss",
  title: "Bliss",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2230,
  bookIndex: 14,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 2 },
    { mapId: 9, mapCount: 46 },
    { mapId: 10, mapCount: 5 },
    { mapId: 12, mapCount: 35 },
    { mapId: 13, mapCount: 41 },
    { mapId: 16, mapCount: 8 },
    { mapId: 26, mapCount: 4 },
    { mapId: 27, mapCount: 25 },
    { mapId: 143, mapCount: 10 },
    { mapId: 255, mapCount: 9 },
    { mapId: 660, mapCount: 5 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 1 },
    { mapId: 1126, mapCount: 58 },
  ],
} as const satisfies TemperLoreBook
