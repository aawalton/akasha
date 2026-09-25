import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hegrisOrders = {
  id: "01a0d5f4-c388-7feb-9200-59b688e13764",
  type: "page-type/temper-lore-book",
  slug: "hegris-orders",
  title: "Hegris' Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1933,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
