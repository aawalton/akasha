import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sighsOfBlackwood = {
  id: "01a0d60b-fdb1-764e-93f1-33427e7b6220",
  type: "page-type/temper-lore-book",
  slug: "sighs-of-blackwood",
  title: "Sighs of Blackwood",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6679,
  bookIndex: 92,
  charted: true,
  onBookshelves: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
