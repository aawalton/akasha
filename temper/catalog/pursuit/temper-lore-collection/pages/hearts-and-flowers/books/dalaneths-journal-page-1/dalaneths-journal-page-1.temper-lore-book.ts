import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dalanethsJournalPage1 = {
  id: "01a0d5f2-af6f-780e-8607-5ca1e23617bd",
  type: "page-type/temper-lore-book",
  slug: "dalaneths-journal-page-1",
  title: "Dalaneth's Journal, Page 1",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 411,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
