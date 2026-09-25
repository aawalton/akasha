import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialRecallOrders = {
  id: "01a0d5f3-7053-700b-97af-6a9f86ded7d2",
  type: "page-type/temper-lore-book",
  slug: "imperial-recall-orders",
  title: "Imperial Recall Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2207,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
