import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMylenne = {
  id: "01a0d5f8-02f8-7d26-988f-d22526351149",
  type: "page-type/temper-lore-book",
  slug: "letter-to-mylenne",
  title: "Letter to Mylenne",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5040,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
