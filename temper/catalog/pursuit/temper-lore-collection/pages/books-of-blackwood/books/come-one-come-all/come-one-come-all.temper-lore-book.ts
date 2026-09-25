import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const comeOneComeAll = {
  id: "01a0d60b-fdaf-7b4d-b162-0e721b151c88",
  type: "page-type/temper-lore-book",
  slug: "come-one-come-all",
  title: "Come One, Come All!",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6697,
  bookIndex: 25,
  charted: true,
  quest: 6636,
  positions: "jsonl",
} as const satisfies TemperLoreBook
