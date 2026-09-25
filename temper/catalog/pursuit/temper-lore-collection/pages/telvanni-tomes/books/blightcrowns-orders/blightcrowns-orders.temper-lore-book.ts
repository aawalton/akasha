import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blightcrownsOrders = {
  id: "01a0d60c-eb9a-73b3-982a-0badcf8fbfce",
  type: "page-type/temper-lore-book",
  slug: "blightcrowns-orders",
  title: "Blightcrown's Orders",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7588,
  bookIndex: 7,
  charted: true,
  quest: 6971,
  positions: "jsonl",
} as const satisfies TemperLoreBook
