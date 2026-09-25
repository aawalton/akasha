import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jewelsOfYokuda = {
  id: "01a0d5f6-6d40-7ec0-9306-b1cf5cd42fc5",
  type: "page-type/temper-lore-book",
  slug: "jewels-of-yokuda",
  title: "Jewels of Yokuda",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 5105,
  bookIndex: 86,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1349, mapCount: 52 },
    { mapId: 1429, mapCount: 30 },
  ],
} as const satisfies TemperLoreBook
