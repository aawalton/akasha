import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skuldafnOrders = {
  id: "01a0d5f4-c389-748a-a3aa-c63cacbf2da8",
  type: "page-type/temper-lore-book",
  slug: "skuldafn-orders",
  title: "Skuldafn Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1341,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
