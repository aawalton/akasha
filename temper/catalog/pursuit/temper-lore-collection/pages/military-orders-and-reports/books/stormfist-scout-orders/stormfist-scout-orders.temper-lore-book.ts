import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stormfistScoutOrders = {
  id: "01a0d5f3-7054-7ff1-a78d-eb3c7a8a3be6",
  type: "page-type/temper-lore-book",
  slug: "stormfist-scout-orders",
  title: "Stormfist Scout Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 532,
  bookIndex: 18,
  charted: true,
  quest: 4086,
  positions: "jsonl",
} as const satisfies TemperLoreBook
