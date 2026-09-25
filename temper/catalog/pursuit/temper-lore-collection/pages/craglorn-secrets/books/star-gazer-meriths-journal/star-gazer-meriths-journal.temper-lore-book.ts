import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const starGazerMerithsJournal = {
  id: "01a0d5f1-c91b-7db2-af25-5a79b83dce2f",
  type: "page-type/temper-lore-book",
  slug: "star-gazer-meriths-journal",
  title: "Star-Gazer Merith's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2646,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
