import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heedMyWords = {
  id: "01a0d5f4-3c11-725a-8a32-15c4b9c6bbca",
  type: "page-type/temper-lore-book",
  slug: "heed-my-words",
  title: "Heed My Words",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1044,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
