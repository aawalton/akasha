import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sweetsForSourCompany = {
  id: "01a0d60b-fdb1-7115-b500-07fa874550b4",
  type: "page-type/temper-lore-book",
  slug: "sweets-for-sour-company",
  title: "Sweets for Sour Company",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6510,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
