import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ceythalmorMissionOrders = {
  id: "01a0d60d-bbe4-79b1-9f8a-328c4f1d2464",
  type: "page-type/temper-lore-book",
  slug: "ceythalmor-mission-orders",
  title: "Ceythalmor Mission Orders",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8241,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
