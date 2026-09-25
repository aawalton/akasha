import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const princeAidensReport = {
  id: "01a0d5f3-7053-73d3-9988-ac339b8fc2ab",
  type: "page-type/temper-lore-book",
  slug: "prince-aidens-report",
  title: "Prince Aiden's Report",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 794,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 1, mapCount: 17 },
    { mapId: 7, mapCount: 9 },
    { mapId: 74, mapCount: 11 },
    { mapId: 143, mapCount: 21 },
    { mapId: 201, mapCount: 3 },
    { mapId: 227, mapCount: 5 },
    { mapId: 258, mapCount: 6 },
  ],
} as const satisfies TemperLoreBook
