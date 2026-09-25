import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fleetQueensOrders = {
  id: "01a0d60c-75b5-73f6-8e4f-e16e17d4e2a4",
  type: "page-type/temper-lore-book",
  slug: "fleet-queens-orders",
  title: "Fleet Queen's Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7039,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
