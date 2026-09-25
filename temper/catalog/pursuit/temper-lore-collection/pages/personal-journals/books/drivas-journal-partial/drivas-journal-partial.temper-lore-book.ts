import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drivasJournalPartial = {
  id: "01a0d5f4-6f1a-7cf0-b059-1570ca42207d",
  type: "page-type/temper-lore-book",
  slug: "drivas-journal-partial",
  title: "Drivas' Journal (Partial)",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1093,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
