import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const entilasFolly = {
  id: "01a0d5f2-509e-7919-893e-433857da33f7",
  type: "page-type/temper-lore-book",
  slug: "entilas-folly",
  title: "Entila's Folly",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1260,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
