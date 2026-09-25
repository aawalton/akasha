import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const supplementaryOrders = {
  id: "01a0d5f3-7054-760a-b88f-180eb79d91ac",
  type: "page-type/temper-lore-book",
  slug: "supplementary-orders",
  title: "Supplementary Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 779,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
