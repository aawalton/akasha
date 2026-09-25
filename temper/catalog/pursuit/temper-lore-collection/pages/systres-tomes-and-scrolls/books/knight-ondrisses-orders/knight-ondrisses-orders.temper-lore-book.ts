import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knightOndrissesOrders = {
  id: "01a0d60c-75b5-748b-b588-c9d5e3a9d4c2",
  type: "page-type/temper-lore-book",
  slug: "knight-ondrisses-orders",
  title: "Knight Ondrisse's Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6932,
  bookIndex: 19,
  charted: true,
  quest: 6752,
  positions: "jsonl",
} as const satisfies TemperLoreBook
