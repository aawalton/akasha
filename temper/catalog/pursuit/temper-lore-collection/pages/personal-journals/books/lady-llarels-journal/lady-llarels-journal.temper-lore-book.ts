import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyLlarelsJournal = {
  id: "01a0d5f4-6f1a-7971-a0d5-f0a41e63b47c",
  type: "page-type/temper-lore-book",
  slug: "lady-llarels-journal",
  title: "Lady Llarel's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 759,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
