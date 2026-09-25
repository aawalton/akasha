import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dominionOrders = {
  id: "01a0d5f3-7052-74d9-8d04-ed2edca8e19e",
  type: "page-type/temper-lore-book",
  slug: "dominion-orders",
  title: "Dominion Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 83,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
