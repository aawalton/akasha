import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mineForemansOrders = {
  id: "01a0d5f2-83a2-7b62-9e61-8a7f7a364f83",
  type: "page-type/temper-lore-book",
  slug: "mine-foremans-orders",
  title: "Mine Foreman's Orders",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1910,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
