import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const book5ThingsList = {
  id: "01a0d60d-708d-73f7-a91d-b3322c068bc8",
  type: "page-type/temper-lore-book",
  slug: "book-5-things-list",
  title: "5 Things List",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8483,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
