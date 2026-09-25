import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const exarchsOrders = {
  id: "01a0d5f1-c91a-7396-a0c8-2765ab04218f",
  type: "page-type/temper-lore-book",
  slug: "exarchs-orders",
  title: "Exarch's Orders",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2710,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
