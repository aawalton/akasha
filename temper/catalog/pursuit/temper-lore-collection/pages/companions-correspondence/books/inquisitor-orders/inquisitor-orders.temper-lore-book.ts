import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inquisitorOrders = {
  id: "01a0d60d-bbe4-76df-ac11-e0d91bf0d839",
  type: "page-type/temper-lore-book",
  slug: "inquisitor-orders",
  title: "Inquisitor Orders",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8328,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:53:39.428Z",
  updatedAt: "2026-09-25T00:53:41.000Z",
} as const satisfies TemperLoreBook
