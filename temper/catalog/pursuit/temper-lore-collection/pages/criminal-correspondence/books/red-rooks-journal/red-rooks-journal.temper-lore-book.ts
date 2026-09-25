import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redRooksJournal = {
  id: "01a0d5f1-f451-7679-a1d1-28158414c31c",
  type: "page-type/temper-lore-book",
  slug: "red-rooks-journal",
  title: "Red Rook's Journal",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1588,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
