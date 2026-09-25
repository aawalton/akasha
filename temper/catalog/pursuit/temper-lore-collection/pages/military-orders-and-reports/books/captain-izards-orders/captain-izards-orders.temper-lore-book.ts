import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainIzardsOrders = {
  id: "01a0d5f3-7052-7290-b802-e3b3fc04f64b",
  type: "page-type/temper-lore-book",
  slug: "captain-izards-orders",
  title: "Captain Izard's Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1942,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
