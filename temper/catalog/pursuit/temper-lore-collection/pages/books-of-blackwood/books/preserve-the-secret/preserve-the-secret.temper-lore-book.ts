import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const preserveTheSecret = {
  id: "01a0d60b-fdb0-7b10-a173-3b3d60592fbb",
  type: "page-type/temper-lore-book",
  slug: "preserve-the-secret",
  title: "Preserve the Secret",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6516,
  bookIndex: 18,
  charted: true,
  quest: 6616,
  positions: "jsonl",
} as const satisfies TemperLoreBook
