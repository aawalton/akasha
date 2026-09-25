import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barrowTrenchScoutsReport = {
  id: "01a0d5f3-7052-7967-91d1-de26e05d492c",
  type: "page-type/temper-lore-book",
  slug: "barrow-trench-scouts-report",
  title: "Barrow Trench Scout's Report",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1805,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
