import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const solusVertilussJournal = {
  id: "01a0d5f7-73fa-71cd-8cd1-dee03e8524bd",
  type: "page-type/temper-lore-book",
  slug: "solus-vertiluss-journal",
  title: "Solus Vertilus's Journal",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3734,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
