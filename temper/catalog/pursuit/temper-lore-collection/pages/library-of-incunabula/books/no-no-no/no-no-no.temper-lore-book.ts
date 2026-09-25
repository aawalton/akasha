import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noNoNo = {
  id: "01a0d5f8-02f9-7a90-8e23-6fa51fe945b3",
  type: "page-type/temper-lore-book",
  slug: "no-no-no",
  title: "No! No! No!",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5445,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
