import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whereIllBe = {
  id: "01a0d5f4-3c13-7cd1-97fe-5791f1503dd3",
  type: "page-type/temper-lore-book",
  slug: "where-ill-be",
  title: "Where I'll Be",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1412,
  bookIndex: 37,
  charted: true,
  quest: 4664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
