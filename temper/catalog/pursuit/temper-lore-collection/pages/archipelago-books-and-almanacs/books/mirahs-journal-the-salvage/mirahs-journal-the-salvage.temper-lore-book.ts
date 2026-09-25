import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mirahsJournalTheSalvage = {
  id: "01a0d60c-baf3-709b-82d5-dc5a7ac60937",
  type: "page-type/temper-lore-book",
  slug: "mirahs-journal-the-salvage",
  title: "Mirah's Journal: The Salvage",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7521,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
