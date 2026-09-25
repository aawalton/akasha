import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const demandsOfThePaintedEye = {
  id: "01a0d60b-fdaf-741a-99f9-4caf6948b909",
  type: "page-type/temper-lore-book",
  slug: "demands-of-the-painted-eye",
  title: "Demands of the Painted Eye",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6501,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
