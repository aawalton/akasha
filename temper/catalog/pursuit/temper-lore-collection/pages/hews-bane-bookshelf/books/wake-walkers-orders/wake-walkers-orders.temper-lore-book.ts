import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wakeWalkersOrders = {
  id: "01a0d5f7-4294-73da-8097-6ce47edc9581",
  type: "page-type/temper-lore-book",
  slug: "wake-walkers-orders",
  title: "Wake Walkers' Orders",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3284,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
