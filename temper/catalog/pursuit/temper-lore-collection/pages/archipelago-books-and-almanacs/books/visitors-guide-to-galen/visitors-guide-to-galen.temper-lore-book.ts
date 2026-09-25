import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitorsGuideToGalen = {
  id: "01a0d60c-baf4-7ed7-9c9f-31c1cf5d1d30",
  type: "page-type/temper-lore-book",
  slug: "visitors-guide-to-galen",
  title: "Visitor's Guide to Galen",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7537,
  bookIndex: 52,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
