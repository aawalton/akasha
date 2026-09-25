import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordOfKhiruna = {
  id: "01a0d5f7-4294-72f5-979e-124388ee9ff5",
  type: "page-type/temper-lore-book",
  slug: "word-of-khiruna",
  title: "Word of Khiruna",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3439,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
