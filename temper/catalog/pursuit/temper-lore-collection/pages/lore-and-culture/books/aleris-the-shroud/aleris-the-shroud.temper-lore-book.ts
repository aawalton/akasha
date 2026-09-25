import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alerisTheShroud = {
  id: "01a0d5f3-3fda-7366-abf0-096699096523",
  type: "page-type/temper-lore-book",
  slug: "aleris-the-shroud",
  title: "Aleris the Shroud",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1107,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
