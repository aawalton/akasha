import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const endegorsOrders = {
  id: "01a0d5f2-253a-74cd-b867-16044b043c6d",
  type: "page-type/temper-lore-book",
  slug: "endegors-orders",
  title: "Endegor's Orders",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7824,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
