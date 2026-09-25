import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morrowindFaunaPartOne = {
  id: "01a0d5f5-f3e4-705a-9bba-cc8884d874e9",
  type: "page-type/temper-lore-book",
  slug: "morrowind-fauna-part-one",
  title: "Morrowind Fauna, Part One",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2149,
  bookIndex: 58,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 15 },
    { mapId: 7, mapCount: 15 },
    { mapId: 13, mapCount: 5 },
    { mapId: 74, mapCount: 5 },
    { mapId: 143, mapCount: 29 },
    { mapId: 227, mapCount: 2 },
    { mapId: 258, mapCount: 8 },
    { mapId: 1060, mapCount: 66 },
  ],
} as const satisfies TemperLoreBook
