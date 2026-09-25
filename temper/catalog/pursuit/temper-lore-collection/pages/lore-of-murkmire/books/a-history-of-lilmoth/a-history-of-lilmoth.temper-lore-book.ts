import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHistoryOfLilmoth = {
  id: "01a0d5f6-a298-78b2-aae1-7b89699c8b0f",
  type: "page-type/temper-lore-book",
  slug: "a-history-of-lilmoth",
  title: "A History of Lilmoth",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5387,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
