import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mathiisenForgeInventory = {
  id: "01a0d5f2-db26-7a5f-a212-aed0c8f583ef",
  type: "page-type/temper-lore-book",
  slug: "mathiisen-forge-inventory",
  title: "Mathiisen Forge Inventory",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 583,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
