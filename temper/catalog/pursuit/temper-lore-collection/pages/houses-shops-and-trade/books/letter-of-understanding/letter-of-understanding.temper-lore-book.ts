import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfUnderstanding = {
  id: "01a0d5f2-db26-747c-ac97-528243a011f6",
  type: "page-type/temper-lore-book",
  slug: "letter-of-understanding",
  title: "Letter of Understanding",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1547,
  bookIndex: 56,
  charted: true,
  quest: 4687,
  positions: "jsonl",
} as const satisfies TemperLoreBook
