import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRuinsOfKemelZePart3 = {
  id: "01a0d5f5-7767-7a79-961a-9523b4f63fdd",
  type: "page-type/temper-lore-book",
  slug: "the-ruins-of-kemel-ze-part-3",
  title: "The Ruins of Kemel-Ze, Part 3",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 805,
  bookIndex: 32,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 11 },
    { mapId: 7, mapCount: 19 },
    { mapId: 75, mapCount: 6 },
    { mapId: 143, mapCount: 32 },
    { mapId: 201, mapCount: 2 },
    { mapId: 258, mapCount: 5 },
  ],
} as const satisfies TemperLoreBook
