import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bartholomewsTheory = {
  id: "01a0d5f8-02f8-779c-b05e-2c698618e897",
  type: "page-type/temper-lore-book",
  slug: "bartholomews-theory",
  title: "Bartholomew's Theory",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6714,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
