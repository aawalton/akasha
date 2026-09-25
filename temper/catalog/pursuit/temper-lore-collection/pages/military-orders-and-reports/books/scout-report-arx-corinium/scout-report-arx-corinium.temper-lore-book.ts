import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scoutReportArxCorinium = {
  id: "01a0d5f3-7054-7919-b9f7-0ee7ae5ae300",
  type: "page-type/temper-lore-book",
  slug: "scout-report-arx-corinium",
  title: "Scout Report: Arx Corinium",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 601,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
