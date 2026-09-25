import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alizindasJournal = {
  id: "01a0d60b-fdaf-7ab0-92b3-006057a13b22",
  type: "page-type/temper-lore-book",
  slug: "alizindas-journal",
  title: "Alizinda's Journal",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6497,
  bookIndex: 59,
  charted: true,
  quest: 6634,
  positions: "jsonl",
} as const satisfies TemperLoreBook
