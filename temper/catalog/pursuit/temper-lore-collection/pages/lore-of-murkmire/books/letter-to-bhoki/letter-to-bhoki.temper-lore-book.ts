import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBhoki = {
  id: "01a0d5f6-a29a-75c7-a580-fe8a1a2ca312",
  type: "page-type/temper-lore-book",
  slug: "letter-to-bhoki",
  title: "Letter to Bhoki",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5188,
  bookIndex: 49,
  charted: true,
  quest: 6254,
  positions: "jsonl",
} as const satisfies TemperLoreBook
