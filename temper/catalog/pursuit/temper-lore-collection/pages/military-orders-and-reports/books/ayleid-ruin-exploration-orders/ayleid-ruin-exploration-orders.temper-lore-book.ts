import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ayleidRuinExplorationOrders = {
  id: "01a0d5f3-7052-7f9d-8c82-fbbdb37d1fdd",
  type: "page-type/temper-lore-book",
  slug: "ayleid-ruin-exploration-orders",
  title: "Ayleid Ruin Exploration Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2206,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
