import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingMaxeviansOrders = {
  id: "01a0d5f6-d68a-7324-816a-23b950c72af2",
  type: "page-type/temper-lore-book",
  slug: "king-maxevians-orders",
  title: "King Maxevian's Orders",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2698,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
