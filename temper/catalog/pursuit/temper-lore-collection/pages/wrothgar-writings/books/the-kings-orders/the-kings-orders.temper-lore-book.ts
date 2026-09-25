import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theKingsOrders = {
  id: "01a0d5f6-d68c-782d-9a95-2c11c0ac3365",
  type: "page-type/temper-lore-book",
  slug: "the-kings-orders",
  title: "The King's Orders",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3064,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
