import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const agganorsJournal = {
  id: "01a0d5f1-c919-72b0-96db-8c936509a7b8",
  type: "page-type/temper-lore-book",
  slug: "agganors-journal",
  title: "Agganor's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2664,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
