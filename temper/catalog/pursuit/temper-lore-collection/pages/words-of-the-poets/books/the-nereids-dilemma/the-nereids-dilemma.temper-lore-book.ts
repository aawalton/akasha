import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNereidsDilemma = {
  id: "01a0d5f6-1c16-7be4-88c4-51e03ddb485f",
  type: "page-type/temper-lore-book",
  slug: "the-nereids-dilemma",
  title: "The Nereid's Dilemma",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1851,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
