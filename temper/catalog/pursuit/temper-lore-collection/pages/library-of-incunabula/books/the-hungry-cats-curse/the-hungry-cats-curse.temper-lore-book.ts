import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHungryCatsCurse = {
  id: "01a0d5f8-02f9-7ff9-aa5e-46767434743f",
  type: "page-type/temper-lore-book",
  slug: "the-hungry-cats-curse",
  title: "The Hungry Cat's Curse",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5043,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
