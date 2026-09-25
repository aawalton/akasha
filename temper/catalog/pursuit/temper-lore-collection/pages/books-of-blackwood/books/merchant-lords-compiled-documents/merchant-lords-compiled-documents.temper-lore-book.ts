import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merchantLordsCompiledDocuments = {
  id: "01a0d60b-fdb0-7a55-9c63-05c20a3e23d7",
  type: "page-type/temper-lore-book",
  slug: "merchant-lords-compiled-documents",
  title: "Merchant Lords' Compiled Documents",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6457,
  bookIndex: 58,
  charted: true,
  quest: 6623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
