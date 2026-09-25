import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forgedSecondCohortOrders = {
  id: "01a0d5f3-7052-704d-8e2a-0ee9231e6a05",
  type: "page-type/temper-lore-book",
  slug: "forged-second-cohort-orders",
  title: "Forged Second Cohort Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2085,
  bookIndex: 72,
  charted: true,
  quest: 3496,
  positions: "jsonl",
} as const satisfies TemperLoreBook
