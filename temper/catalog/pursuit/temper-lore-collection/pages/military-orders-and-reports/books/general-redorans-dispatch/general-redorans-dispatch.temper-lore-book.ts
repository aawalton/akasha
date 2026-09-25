import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const generalRedoransDispatch = {
  id: "01a0d5f3-7053-766d-bb95-05c945041300",
  type: "page-type/temper-lore-book",
  slug: "general-redorans-dispatch",
  title: "General Redoran's Dispatch",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 608,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
