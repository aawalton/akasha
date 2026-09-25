import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iKnowItsName = {
  id: "01a0d5f6-45ad-7006-9630-f9d376eebc18",
  type: "page-type/temper-lore-book",
  slug: "i-know-its-name",
  title: "I Know Its Name",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1225,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
