import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pentarchsOrders = {
  id: "01a0d60b-8108-7643-bb27-a14a5b1bc8cb",
  type: "page-type/temper-lore-book",
  slug: "pentarchs-orders",
  title: "Pentarch's Orders",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6111,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
