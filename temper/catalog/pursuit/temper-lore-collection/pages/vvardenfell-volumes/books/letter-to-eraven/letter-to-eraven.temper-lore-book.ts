import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEraven = {
  id: "01a0d5f7-aa99-71ea-8121-719628e66537",
  type: "page-type/temper-lore-book",
  slug: "letter-to-eraven",
  title: "Letter to Eraven",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3961,
  bookIndex: 99,
  charted: true,
  quest: 5799,
  positions: "jsonl",
} as const satisfies TemperLoreBook
