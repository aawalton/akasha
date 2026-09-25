import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nahirahsJournal = {
  id: "01a0d5f4-6f1b-7806-9519-5c46912be6e0",
  type: "page-type/temper-lore-book",
  slug: "nahirahs-journal",
  title: "Nahirah's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1651,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
