import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSonya = {
  id: "01a0d5f2-af70-7bd9-a8e1-2968457721d6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-sonya",
  title: "Letter to Sonya",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 497,
  bookIndex: 11,
  charted: true,
  quest: 4212,
  positions: "jsonl",
} as const satisfies TemperLoreBook
