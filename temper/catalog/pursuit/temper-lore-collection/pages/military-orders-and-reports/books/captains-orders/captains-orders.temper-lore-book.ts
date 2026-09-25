import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainsOrders = {
  id: "01a0d5f3-7052-7b6e-8345-447388a544b9",
  type: "page-type/temper-lore-book",
  slug: "captains-orders",
  title: "Captain's Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1921,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
