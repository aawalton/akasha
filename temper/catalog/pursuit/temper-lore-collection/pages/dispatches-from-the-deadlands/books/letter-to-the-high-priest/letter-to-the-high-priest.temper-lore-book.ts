import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTheHighPriest = {
  id: "01a0d60c-40c0-7538-acdd-8473c244f64b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-high-priest",
  title: "Letter to the High Priest",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6759,
  bookIndex: 14,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
