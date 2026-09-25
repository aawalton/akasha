import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yvesGrandvacheLedger = {
  id: "01a0d60c-baf4-7555-ac76-d72200d21d4a",
  type: "page-type/temper-lore-book",
  slug: "yves-grandvache-ledger",
  title: "Yves Grandvache Ledger",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7290,
  bookIndex: 18,
  charted: true,
  quest: 6845,
  positions: "jsonl",
} as const satisfies TemperLoreBook
