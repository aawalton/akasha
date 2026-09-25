import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sisterCeldinasOrders = {
  id: "01a0d60c-40c0-7199-9bee-6df63f622529",
  type: "page-type/temper-lore-book",
  slug: "sister-celdinas-orders",
  title: "Sister Celdina's Orders",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6769,
  bookIndex: 80,
  charted: true,
  quest: 6707,
  positions: "jsonl",
} as const satisfies TemperLoreBook
