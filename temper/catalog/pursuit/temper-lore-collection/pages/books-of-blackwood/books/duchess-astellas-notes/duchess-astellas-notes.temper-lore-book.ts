import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const duchessAstellasNotes = {
  id: "01a0d60b-fdaf-7a71-a8b7-c2c95a61b846",
  type: "page-type/temper-lore-book",
  slug: "duchess-astellas-notes",
  title: "Duchess Astella's Notes",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6499,
  bookIndex: 62,
  charted: true,
  quest: 6634,
  positions: "jsonl",
} as const satisfies TemperLoreBook
