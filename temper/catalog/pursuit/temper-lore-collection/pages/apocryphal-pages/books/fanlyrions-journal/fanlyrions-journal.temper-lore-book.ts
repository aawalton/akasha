import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fanlyrionsJournal = {
  id: "01a0d60d-156d-7723-bba0-ab1efd07dc11",
  type: "page-type/temper-lore-book",
  slug: "fanlyrions-journal",
  title: "Fanlyrion's Journal",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7466,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
