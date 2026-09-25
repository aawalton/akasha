import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const baronSoricksOrders = {
  id: "01a0d5f4-c383-720d-ae82-b08fe0c4f3a8",
  type: "page-type/temper-lore-book",
  slug: "baron-soricks-orders",
  title: "Baron Sorick's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1176,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
