import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fanaticsOrders = {
  id: "01a0d5f6-d68a-75a6-b8d9-ae4922f20c16",
  type: "page-type/temper-lore-book",
  slug: "fanatics-orders",
  title: "Fanatic's Orders",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3031,
  bookIndex: 28,
  charted: true,
  quest: 5447,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:38.922Z",
  updatedAt: "2026-09-25T00:28:41.000Z",
} as const satisfies TemperLoreBook
