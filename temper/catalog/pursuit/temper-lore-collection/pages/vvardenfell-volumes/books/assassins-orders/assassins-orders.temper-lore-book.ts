import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const assassinsOrders = {
  id: "01a0d5f7-aa98-7cb8-a6c8-a80d291034e3",
  type: "page-type/temper-lore-book",
  slug: "assassins-orders",
  title: "Assassin's Orders",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4013,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
