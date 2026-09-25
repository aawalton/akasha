import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnTheOrderSkeevera = {
  id: "01a0d5f5-1385-7bac-87c6-d6e6e7357c35",
  type: "page-type/temper-lore-book",
  slug: "notes-on-the-order-skeevera",
  title: "Notes on the Order Skeevera",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 874,
  bookIndex: 28,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 10, mapCount: 25 },
    { mapId: 26, mapCount: 25 },
    { mapId: 27, mapCount: 3 },
    { mapId: 300, mapCount: 34 },
  ],
} as const satisfies TemperLoreBook
