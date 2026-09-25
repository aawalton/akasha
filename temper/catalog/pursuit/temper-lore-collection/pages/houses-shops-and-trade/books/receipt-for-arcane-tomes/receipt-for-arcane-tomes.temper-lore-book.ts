import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const receiptForArcaneTomes = {
  id: "01a0d5f2-db26-71ca-9e01-b38d738b4bea",
  type: "page-type/temper-lore-book",
  slug: "receipt-for-arcane-tomes",
  title: "Receipt for Arcane Tomes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1648,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
