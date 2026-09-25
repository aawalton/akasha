import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRuinsOfKemelZePart1 = {
  id: "01a0d5f5-7767-7dd2-b9c7-3251c4af8d83",
  type: "page-type/temper-lore-book",
  slug: "the-ruins-of-kemel-ze-part-1",
  title: "The Ruins of Kemel-Ze, Part 1",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 803,
  bookIndex: 30,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 38 },
    { mapId: 7, mapCount: 63 },
    { mapId: 10, mapCount: 10 },
    { mapId: 13, mapCount: 6 },
    { mapId: 26, mapCount: 11 },
    { mapId: 27, mapCount: 2 },
    { mapId: 74, mapCount: 17 },
    { mapId: 75, mapCount: 14 },
    { mapId: 143, mapCount: 72 },
    { mapId: 201, mapCount: 3 },
    { mapId: 227, mapCount: 4 },
    { mapId: 258, mapCount: 7 },
    { mapId: 300, mapCount: 17 },
  ],
} as const satisfies TemperLoreBook
