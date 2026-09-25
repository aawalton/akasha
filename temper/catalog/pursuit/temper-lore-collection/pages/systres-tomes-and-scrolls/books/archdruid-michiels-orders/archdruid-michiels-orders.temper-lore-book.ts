import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archdruidMichielsOrders = {
  id: "01a0d60c-75b4-745c-bfc0-07814fa10ecc",
  type: "page-type/temper-lore-book",
  slug: "archdruid-michiels-orders",
  title: "Archdruid Michiel's Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7271,
  charted: true,
  quest: 6843,
  positions: "jsonl",
} as const satisfies TemperLoreBook
