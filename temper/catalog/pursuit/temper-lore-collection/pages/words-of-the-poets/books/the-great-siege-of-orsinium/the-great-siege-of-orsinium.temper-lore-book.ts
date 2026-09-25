import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreatSiegeOfOrsinium = {
  id: "01a0d5f6-1c16-7e0f-b2f2-af510215dd33",
  type: "page-type/temper-lore-book",
  slug: "the-great-siege-of-orsinium",
  title: "The Great Siege of Orsinium",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1493,
  bookIndex: 46,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 20 },
    { mapId: 10, mapCount: 7 },
    { mapId: 13, mapCount: 5 },
    { mapId: 16, mapCount: 6 },
    { mapId: 20, mapCount: 7 },
    { mapId: 26, mapCount: 4 },
    { mapId: 27, mapCount: 6 },
    { mapId: 125, mapCount: 26 },
    { mapId: 143, mapCount: 17 },
    { mapId: 255, mapCount: 30 },
    { mapId: 256, mapCount: 4 },
    { mapId: 660, mapCount: 2 },
    { mapId: 1060, mapCount: 1 },
    { mapId: 1126, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
