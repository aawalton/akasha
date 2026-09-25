import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reverenceForTheDead = {
  id: "01a0d5f3-3fdb-7676-aa40-12ea0792a43e",
  type: "page-type/temper-lore-book",
  slug: "reverence-for-the-dead",
  title: "Reverence for the Dead",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1487,
  bookIndex: 62,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 4 },
    { mapId: 22, mapCount: 11 },
    { mapId: 27, mapCount: 1 },
    { mapId: 30, mapCount: 10 },
    { mapId: 61, mapCount: 3 },
  ],
} as const satisfies TemperLoreBook
