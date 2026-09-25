import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lastWillAndTestament = {
  id: "01a0d5f6-45ad-7475-9366-6f78150452a5",
  type: "page-type/temper-lore-book",
  slug: "last-will-and-testament",
  title: "Last Will and Testament",
  collection: "temper-lore-collection/final-words",
  esoBookId: 488,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
