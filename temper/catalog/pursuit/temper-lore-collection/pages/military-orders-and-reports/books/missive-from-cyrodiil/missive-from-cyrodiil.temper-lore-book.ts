import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missiveFromCyrodiil = {
  id: "01a0d5f3-7053-7b7c-8a91-17aba6292fdf",
  type: "page-type/temper-lore-book",
  slug: "missive-from-cyrodiil",
  title: "Missive from Cyrodiil",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1610,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:24:56.147Z",
  updatedAt: "2026-09-25T00:24:58.000Z",
} as const satisfies TemperLoreBook
