import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const generalConelesOrders = {
  id: "01a0d5f3-7053-7a3a-a099-17746a543287",
  type: "page-type/temper-lore-book",
  slug: "general-coneles-orders",
  title: "General Conele's Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 125,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
