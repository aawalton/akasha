import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingNantharionsOrders = {
  id: "01a0d60d-4aaf-7e72-86de-f1abe1c8d8cb",
  type: "page-type/temper-lore-book",
  slug: "king-nantharions-orders",
  title: "King Nantharion's Orders",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8027,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
