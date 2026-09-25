import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrueFateOfKingRanser = {
  id: "01a0d5f2-509f-726b-bbd6-79a8b02391ac",
  type: "page-type/temper-lore-book",
  slug: "the-true-fate-of-king-ranser",
  title: "The True Fate of King Ranser",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1920,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
