import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const birdsOfGloommire = {
  id: "01a0d60b-fdaf-7d73-9e5a-19a284c83e17",
  type: "page-type/temper-lore-book",
  slug: "birds-of-gloommire",
  title: "Birds of Gloommire",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6702,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
