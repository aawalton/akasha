import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAgnor = {
  id: "01a0d5f1-f451-75a6-a3eb-348850b0fed6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-agnor",
  title: "Letter to Agnor",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1232,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
