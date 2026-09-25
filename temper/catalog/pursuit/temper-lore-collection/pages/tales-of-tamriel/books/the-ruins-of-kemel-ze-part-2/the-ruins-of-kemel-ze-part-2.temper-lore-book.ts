import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRuinsOfKemelZePart2 = {
  id: "01a0d5f5-7767-7050-b90c-b8f68781fb3e",
  type: "page-type/temper-lore-book",
  slug: "the-ruins-of-kemel-ze-part-2",
  title: "The Ruins of Kemel-Ze, Part 2",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 804,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 29 },
    { mapId: 7, mapCount: 23 },
    { mapId: 13, mapCount: 1 },
    { mapId: 74, mapCount: 15 },
    { mapId: 75, mapCount: 8 },
    { mapId: 143, mapCount: 44 },
    { mapId: 201, mapCount: 4 },
    { mapId: 227, mapCount: 2 },
    { mapId: 258, mapCount: 13 },
  ],
} as const satisfies TemperLoreBook
