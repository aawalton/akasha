import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const headOverseersOrders = {
  id: "01a0d60c-40c0-73a1-a667-8a998d15670b",
  type: "page-type/temper-lore-book",
  slug: "head-overseers-orders",
  title: "Head Overseer's Orders",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6922,
  bookIndex: 20,
  charted: true,
  quest: 6698,
  positions: "jsonl",
} as const satisfies TemperLoreBook
