import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ilthagsOrders = {
  id: "01a0d5f1-c91a-7dc9-866a-964ea3bbe986",
  type: "page-type/temper-lore-book",
  slug: "ilthags-orders",
  title: "Ilthag's Orders",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2695,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
