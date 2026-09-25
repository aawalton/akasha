import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bookOfThoughts = {
  id: "01a0d5f2-509e-7d53-8a81-9295a5a6f983",
  type: "page-type/temper-lore-book",
  slug: "book-of-thoughts",
  title: "Book of Thoughts",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 725,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
