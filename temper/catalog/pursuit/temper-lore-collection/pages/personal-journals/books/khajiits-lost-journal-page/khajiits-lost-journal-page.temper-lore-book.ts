import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khajiitsLostJournalPage = {
  id: "01a0d5f4-6f1a-7ca7-a0be-d0a3c67ab008",
  type: "page-type/temper-lore-book",
  slug: "khajiits-lost-journal-page",
  title: "Khajiit's Lost Journal Page",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1861,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
