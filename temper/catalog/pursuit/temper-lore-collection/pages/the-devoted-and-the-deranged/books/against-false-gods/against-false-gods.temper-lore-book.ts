import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const againstFalseGods = {
  id: "01a0d5f5-abb9-726c-817c-7671d441a289",
  type: "page-type/temper-lore-book",
  slug: "against-false-gods",
  title: "Against False Gods",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 645,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
