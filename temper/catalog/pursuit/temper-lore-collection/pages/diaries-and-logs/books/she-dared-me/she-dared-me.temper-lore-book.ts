import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sheDaredMe = {
  id: "01a0d5f2-509f-70ca-9b61-4172e4539974",
  type: "page-type/temper-lore-book",
  slug: "she-dared-me",
  title: "She Dared Me",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1317,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
