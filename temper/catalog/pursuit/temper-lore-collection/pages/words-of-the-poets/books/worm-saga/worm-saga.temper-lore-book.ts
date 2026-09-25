import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormSaga = {
  id: "01a0d5f6-1c16-76e9-a412-abe73ae9a505",
  type: "page-type/temper-lore-book",
  slug: "worm-saga",
  title: "Worm Saga",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 817,
  bookIndex: 24,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 18 },
    { mapId: 10, mapCount: 7 },
    { mapId: 12, mapCount: 13 },
    { mapId: 13, mapCount: 10 },
    { mapId: 26, mapCount: 16 },
    { mapId: 27, mapCount: 5 },
    { mapId: 61, mapCount: 1 },
    { mapId: 300, mapCount: 14 },
  ],
} as const satisfies TemperLoreBook
