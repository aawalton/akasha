import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burrsWritingPractice = {
  id: "01a0d5f8-02f8-79d3-b452-53ce7b1c56bc",
  type: "page-type/temper-lore-book",
  slug: "burrs-writing-practice",
  title: "Burr's Writing Practice",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5477,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
