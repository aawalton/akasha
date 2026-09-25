import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBalorgh = {
  id: "01a0d5f8-02f8-7268-b00b-d16ed21ad84f",
  type: "page-type/temper-lore-book",
  slug: "letter-to-balorgh",
  title: "Letter to Balorgh",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5045,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
