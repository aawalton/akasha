import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrawledCeythalmorOrders = {
  id: "01a0d60d-bbe4-7c34-9f59-d5b232bedd2d",
  type: "page-type/temper-lore-book",
  slug: "scrawled-ceythalmor-orders",
  title: "Scrawled Ceythalmor Orders",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 7998,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:53:39.428Z",
  updatedAt: "2026-09-25T00:53:41.000Z",
} as const satisfies TemperLoreBook
