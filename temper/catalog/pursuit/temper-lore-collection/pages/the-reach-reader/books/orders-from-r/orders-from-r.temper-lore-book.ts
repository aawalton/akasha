import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromR = {
  id: "01a0d60b-c958-7b44-9427-0de1291f2677",
  type: "page-type/temper-lore-book",
  slug: "orders-from-r",
  title: "Orders from R",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6382,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
