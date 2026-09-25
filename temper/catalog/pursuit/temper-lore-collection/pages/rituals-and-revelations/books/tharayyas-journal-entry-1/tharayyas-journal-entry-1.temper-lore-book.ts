import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tharayyasJournalEntry1 = {
  id: "01a0d5f5-444c-7a6a-a1ce-06e9305b9378",
  type: "page-type/temper-lore-book",
  slug: "tharayyas-journal-entry-1",
  title: "Tharayya's Journal, Entry 1",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 102,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
