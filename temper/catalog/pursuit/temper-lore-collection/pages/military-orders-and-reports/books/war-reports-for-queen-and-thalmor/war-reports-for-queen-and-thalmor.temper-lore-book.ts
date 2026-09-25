import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warReportsForQueenAndThalmor = {
  id: "01a0d5f3-7054-7806-8522-31a2ae669f47",
  type: "page-type/temper-lore-book",
  slug: "war-reports-for-queen-and-thalmor",
  title: "War Reports for Queen and Thalmor",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2280,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
