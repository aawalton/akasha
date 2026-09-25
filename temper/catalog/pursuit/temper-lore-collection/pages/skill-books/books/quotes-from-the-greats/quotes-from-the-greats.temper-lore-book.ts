import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quotesFromTheGreats = {
  id: "01a0d5f6-6d41-7f1b-af7f-e0e4987bd4f9",
  type: "page-type/temper-lore-book",
  slug: "quotes-from-the-greats",
  title: "Quotes from the Greats",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2346,
  bookIndex: 38,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 3 },
    { mapId: 9, mapCount: 41 },
    { mapId: 10, mapCount: 9 },
    { mapId: 12, mapCount: 33 },
    { mapId: 13, mapCount: 59 },
    { mapId: 16, mapCount: 11 },
    { mapId: 20, mapCount: 1 },
    { mapId: 26, mapCount: 3 },
    { mapId: 27, mapCount: 16 },
    { mapId: 143, mapCount: 1 },
    { mapId: 255, mapCount: 15 },
    { mapId: 660, mapCount: 3 },
    { mapId: 1060, mapCount: 3 },
    { mapId: 1126, mapCount: 12 },
  ],
} as const satisfies TemperLoreBook
