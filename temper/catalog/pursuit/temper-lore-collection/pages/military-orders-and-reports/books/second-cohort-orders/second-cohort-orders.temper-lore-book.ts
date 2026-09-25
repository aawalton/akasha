import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secondCohortOrders = {
  id: "01a0d5f3-7054-7a9d-b24a-fb97a742c2d9",
  type: "page-type/temper-lore-book",
  slug: "second-cohort-orders",
  title: "Second Cohort Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2084,
  bookIndex: 71,
  charted: true,
  quest: 3496,
  positions: "jsonl",
} as const satisfies TemperLoreBook
