import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const signalTowerOrders = {
  id: "01a0d5f6-d68b-733e-980b-b49893bd6b96",
  type: "page-type/temper-lore-book",
  slug: "signal-tower-orders",
  title: "Signal Tower Orders",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3022,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
