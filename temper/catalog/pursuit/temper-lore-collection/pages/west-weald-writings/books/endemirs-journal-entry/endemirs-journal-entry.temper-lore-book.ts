import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const endemirsJournalEntry = {
  id: "01a0d60d-4aaf-73dc-8c8a-9355a19b0c4d",
  type: "page-type/temper-lore-book",
  slug: "endemirs-journal-entry",
  title: "Endemir's Journal Entry",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8192,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
