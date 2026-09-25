import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const armamentInventory = {
  id: "01a0d5f2-db25-719a-848f-eab65bedf292",
  type: "page-type/temper-lore-book",
  slug: "armament-inventory",
  title: "Armament Inventory",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 716,
  bookIndex: 31,
  charted: true,
  quest: 4293,
  positions: "jsonl",
} as const satisfies TemperLoreBook
