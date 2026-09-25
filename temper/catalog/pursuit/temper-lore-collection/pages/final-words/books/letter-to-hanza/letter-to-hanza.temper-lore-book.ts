import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHanza = {
  id: "01a0d5f6-45ad-7510-9095-a2fce33cfa71",
  type: "page-type/temper-lore-book",
  slug: "letter-to-hanza",
  title: "Letter to Hanza",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2526,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
