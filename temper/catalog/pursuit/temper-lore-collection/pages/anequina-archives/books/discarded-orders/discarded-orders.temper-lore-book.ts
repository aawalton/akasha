import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const discardedOrders = {
  id: "01a0d60b-2344-7b84-afa8-bf9e5a175f61",
  type: "page-type/temper-lore-book",
  slug: "discarded-orders",
  title: "Discarded Orders",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5505,
  bookIndex: 3,
  charted: true,
  quest: 6336,
  positions: "jsonl",
} as const satisfies TemperLoreBook
