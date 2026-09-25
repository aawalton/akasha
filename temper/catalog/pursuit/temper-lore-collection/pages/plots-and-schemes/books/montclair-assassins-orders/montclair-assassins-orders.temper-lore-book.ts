import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const montclairAssassinsOrders = {
  id: "01a0d5f4-c388-7831-a61f-09db79758e08",
  type: "page-type/temper-lore-book",
  slug: "montclair-assassins-orders",
  title: "Montclair Assassin's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1989,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
