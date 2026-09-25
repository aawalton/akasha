import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrueBalance = {
  id: "01a0d5f5-7768-7baf-b613-a675cbf8b450",
  type: "page-type/temper-lore-book",
  slug: "the-true-balance",
  title: "The True Balance",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 72,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
