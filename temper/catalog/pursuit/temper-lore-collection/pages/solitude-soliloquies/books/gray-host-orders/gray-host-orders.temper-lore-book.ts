import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grayHostOrders = {
  id: "01a0d60b-8107-74a7-afcc-53fb449f35a9",
  type: "page-type/temper-lore-book",
  slug: "gray-host-orders",
  title: "Gray Host Orders",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5940,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
