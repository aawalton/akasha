import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listOfBooks = {
  id: "01a0d60d-156e-7a2f-920c-43cd2cd83576",
  type: "page-type/temper-lore-book",
  slug: "list-of-books",
  title: "List of Books",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7560,
  bookIndex: 24,
  charted: true,
  quest: 6997,
  positions: "jsonl",
} as const satisfies TemperLoreBook
