import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chronicleOfApocrypha = {
  id: "01a0d60d-156d-78d9-b7d2-29d1fc56c020",
  type: "page-type/temper-lore-book",
  slug: "chronicle-of-apocrypha",
  title: "Chronicle of Apocrypha",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7714,
  bookIndex: 12,
  charted: true,
  quest: 6977,
  positions: "jsonl",
} as const satisfies TemperLoreBook
