import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTaleOfDroZira = {
  id: "01a0d5f5-7767-7d68-8b22-f8fae36be10e",
  type: "page-type/temper-lore-book",
  slug: "the-tale-of-dro-zira",
  title: "The Tale of Dro-Zira",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 808,
  bookIndex: 33,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 29 },
    { mapId: 7, mapCount: 16 },
    { mapId: 9, mapCount: 12 },
    { mapId: 12, mapCount: 28 },
    { mapId: 13, mapCount: 16 },
    { mapId: 20, mapCount: 2 },
    { mapId: 27, mapCount: 5 },
    { mapId: 74, mapCount: 5 },
    { mapId: 75, mapCount: 6 },
    { mapId: 143, mapCount: 47 },
    { mapId: 201, mapCount: 9 },
    { mapId: 227, mapCount: 1 },
    { mapId: 258, mapCount: 1 },
  ],
} as const satisfies TemperLoreBook
