import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toMyLove = {
  id: "01a0d60b-fdb1-7349-b747-9d21de4d4ad0",
  type: "page-type/temper-lore-book",
  slug: "to-my-love",
  title: "To My Love",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6692,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
