import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const moreScorions = {
  id: "01a0d5f8-02f9-75aa-808a-69fa8c5b8ec7",
  type: "page-type/temper-lore-book",
  slug: "more-scorions",
  title: "More Scorions",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6719,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
