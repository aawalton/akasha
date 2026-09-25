import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kerthorsSupplyList = {
  id: "01a0d5f2-db26-7739-9d15-355c96dd3d82",
  type: "page-type/temper-lore-book",
  slug: "kerthors-supply-list",
  title: "Kerthor's Supply List",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 444,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
