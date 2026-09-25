import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bazaarDirectory = {
  id: "01a0d60b-fdaf-7dfe-8b1b-4bc7c6a5adce",
  type: "page-type/temper-lore-book",
  slug: "bazaar-directory",
  title: "Bazaar Directory",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6453,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
