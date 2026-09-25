import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howToWinAFight = {
  id: "01a0d5f6-6d40-7914-87a6-87f79cc01568",
  type: "page-type/temper-lore-book",
  slug: "how-to-win-a-fight",
  title: "How to Win a Fight",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2223,
  bookIndex: 7,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 5 },
    { mapId: 10, mapCount: 1 },
    { mapId: 13, mapCount: 7 },
    { mapId: 16, mapCount: 9 },
    { mapId: 20, mapCount: 32 },
    { mapId: 26, mapCount: 8 },
    { mapId: 27, mapCount: 5 },
    { mapId: 125, mapCount: 21 },
    { mapId: 143, mapCount: 7 },
    { mapId: 255, mapCount: 23 },
    { mapId: 256, mapCount: 24 },
    { mapId: 660, mapCount: 4 },
    { mapId: 1060, mapCount: 2 },
    { mapId: 1126, mapCount: 49 },
  ],
} as const satisfies TemperLoreBook
