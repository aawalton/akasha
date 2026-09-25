import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inventoryConfidential = {
  id: "01a0d5f2-db26-7707-8091-bec26adc84d5",
  type: "page-type/temper-lore-book",
  slug: "inventory-confidential",
  title: "Inventory (Confidential)",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1053,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
