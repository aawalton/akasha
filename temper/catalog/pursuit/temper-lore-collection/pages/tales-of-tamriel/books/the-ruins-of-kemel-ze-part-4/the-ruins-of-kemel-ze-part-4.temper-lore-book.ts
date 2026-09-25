import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRuinsOfKemelZePart4 = {
  id: "01a0d5f5-7767-7e34-a073-1402267a8b28",
  type: "page-type/temper-lore-book",
  slug: "the-ruins-of-kemel-ze-part-4",
  title: "The Ruins of Kemel-Ze, Part 4",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 824,
  bookIndex: 37,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 9, mapCount: 15 },
    { mapId: 12, mapCount: 42 },
    { mapId: 13, mapCount: 14 },
    { mapId: 27, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
