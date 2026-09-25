import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const systresHistoryAddendum = {
  id: "01a0d60c-baf4-7884-b0a7-d92491443113",
  type: "page-type/temper-lore-book",
  slug: "systres-history-addendum",
  title: "Systres History: Addendum",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7535,
  bookIndex: 50,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2212, mapCount: 1 }],
} as const satisfies TemperLoreBook
