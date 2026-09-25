import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forgedInTheHeartOfMundus = {
  id: "01a0d5f6-6d40-7900-b56b-b2fb386b0e94",
  type: "page-type/temper-lore-book",
  slug: "forged-in-the-heart-of-mundus",
  title: "Forged in the Heart of Mundus",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2395,
  bookIndex: 53,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 44 },
    { mapId: 26, mapCount: 40 },
    { mapId: 27, mapCount: 9 },
    { mapId: 61, mapCount: 3 },
    { mapId: 300, mapCount: 45 },
    { mapId: 1126, mapCount: 12 },
  ],
} as const satisfies TemperLoreBook
