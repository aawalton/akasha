import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vardansDiary = {
  id: "01a0d5f5-1386-7b2e-92a6-5e386620af10",
  type: "page-type/temper-lore-book",
  slug: "vardans-diary",
  title: "Vardan's Diary",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1342,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
