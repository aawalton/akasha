import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const houseRedoranOrders = {
  id: "01a0d5f7-aa98-7e6c-a8a9-57ea5417c7f0",
  type: "page-type/temper-lore-book",
  slug: "house-redoran-orders",
  title: "House Redoran Orders",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4099,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
