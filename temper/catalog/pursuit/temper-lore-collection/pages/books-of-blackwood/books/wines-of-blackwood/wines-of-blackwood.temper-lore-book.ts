import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const winesOfBlackwood = {
  id: "01a0d60b-fdb1-769a-b883-b0ef98d30d11",
  type: "page-type/temper-lore-book",
  slug: "wines-of-blackwood",
  title: "Wines of Blackwood",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6529,
  bookIndex: 73,
  charted: true,
  onBookshelves: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
