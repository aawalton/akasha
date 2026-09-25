import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const diggingOrders = {
  id: "01a0d5f1-f451-7771-bb70-d78d872b5600",
  type: "page-type/temper-lore-book",
  slug: "digging-orders",
  title: "Digging Orders",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 687,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
