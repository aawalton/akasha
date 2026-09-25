import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rahtisOrders = {
  id: "01a0d60b-2345-7d66-85ee-39ec804ffe02",
  type: "page-type/temper-lore-book",
  slug: "rahtis-orders",
  title: "Rahti's Orders",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5383,
  bookIndex: 80,
  charted: true,
  quest: 6301,
  positions: "jsonl",
} as const satisfies TemperLoreBook
