import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cipiusOrders = {
  id: "01a0d5f3-7052-7ed0-95f7-4f0e5b385e3e",
  type: "page-type/temper-lore-book",
  slug: "cipius-orders",
  title: "Cipius' Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1841,
  bookIndex: 64,
  charted: true,
  quest: 1799,
  positions: "jsonl",
  createdAt: "2026-09-25T00:24:56.146Z",
  updatedAt: "2026-09-25T00:24:58.000Z",
} as const satisfies TemperLoreBook
