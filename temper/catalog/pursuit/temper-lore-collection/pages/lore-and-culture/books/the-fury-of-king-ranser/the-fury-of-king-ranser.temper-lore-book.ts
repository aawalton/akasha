import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFuryOfKingRanser = {
  id: "01a0d5f3-3fdb-75d8-8f7d-2ef83f805c41",
  type: "page-type/temper-lore-book",
  slug: "the-fury-of-king-ranser",
  title: "The Fury of King Ranser",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1485,
  bookIndex: 61,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 6 },
    { mapId: 26, mapCount: 14 },
    { mapId: 27, mapCount: 2 },
    { mapId: 300, mapCount: 22 },
  ],
} as const satisfies TemperLoreBook
