import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWatersOfOblivion = {
  id: "01a0d5f2-253b-7347-9b31-8918bfb21637",
  type: "page-type/temper-lore-book",
  slug: "the-waters-of-oblivion",
  title: "The Waters of Oblivion",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2347,
  bookIndex: 82,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 7, mapCount: 9 },
    { mapId: 10, mapCount: 18 },
    { mapId: 13, mapCount: 6 },
    { mapId: 16, mapCount: 3 },
    { mapId: 26, mapCount: 1 },
    { mapId: 27, mapCount: 6 },
    { mapId: 125, mapCount: 2 },
    { mapId: 143, mapCount: 15 },
    { mapId: 255, mapCount: 35 },
    { mapId: 660, mapCount: 1 },
    { mapId: 667, mapCount: 1 },
    { mapId: 1060, mapCount: 3 },
    { mapId: 1126, mapCount: 4 },
  ],
} as const satisfies TemperLoreBook
