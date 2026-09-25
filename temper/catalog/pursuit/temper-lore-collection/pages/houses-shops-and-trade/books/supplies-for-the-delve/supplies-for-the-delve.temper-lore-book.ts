import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const suppliesForTheDelve = {
  id: "01a0d5f2-db26-7737-93af-6db244e76566",
  type: "page-type/temper-lore-book",
  slug: "supplies-for-the-delve",
  title: "Supplies for the Delve",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1952,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
