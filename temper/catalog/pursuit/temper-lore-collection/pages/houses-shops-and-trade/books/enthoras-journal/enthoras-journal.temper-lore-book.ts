import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const enthorasJournal = {
  id: "01a0d5f2-db26-774f-9fe7-d66c2acac8bb",
  type: "page-type/temper-lore-book",
  slug: "enthoras-journal",
  title: "Enthoras' Journal",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 2121,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
