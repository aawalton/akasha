import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const northglenFarmOpportunities = {
  id: "01a0d5f2-db26-73b7-901f-113987552c2a",
  type: "page-type/temper-lore-book",
  slug: "northglen-farm-opportunities",
  title: "Northglen Farm Opportunities",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1876,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
