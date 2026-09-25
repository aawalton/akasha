import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anchoritesLog = {
  id: "01a0d5f5-c96e-7a94-90e4-f2d233d283fd",
  type: "page-type/temper-lore-book",
  slug: "anchorites-log",
  title: "Anchorite's Log",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 1365,
  bookIndex: 4,
  charted: true,
  quest: 4607,
  positions: "jsonl",
} as const satisfies TemperLoreBook
