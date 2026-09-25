import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blackDaggerRecallOrders = {
  id: "01a0d5f1-f450-7cee-a77a-c94e40da3a80",
  type: "page-type/temper-lore-book",
  slug: "black-dagger-recall-orders",
  title: "Black Dagger Recall Orders",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2232,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
