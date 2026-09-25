import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const duskCaptainZenfissOrders = {
  id: "01a0d60c-eb9b-744c-af92-08f13ee59c5a",
  type: "page-type/temper-lore-book",
  slug: "dusk-captain-zenfiss-orders",
  title: "Dusk Captain Zenfis's Orders",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7565,
  bookIndex: 14,
  charted: true,
  quest: 6973,
  positions: "jsonl",
} as const satisfies TemperLoreBook
