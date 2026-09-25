import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pendingOrders = {
  id: "01a0d5f2-db26-7b20-9f5b-f91413720c9c",
  type: "page-type/temper-lore-book",
  slug: "pending-orders",
  title: "Pending Orders",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 378,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
