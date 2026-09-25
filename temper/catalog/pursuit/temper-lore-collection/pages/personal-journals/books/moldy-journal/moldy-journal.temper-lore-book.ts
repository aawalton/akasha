import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const moldyJournal = {
  id: "01a0d5f4-6f1b-7586-ae28-e5b1d9f5816a",
  type: "page-type/temper-lore-book",
  slug: "moldy-journal",
  title: "Moldy Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 491,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
