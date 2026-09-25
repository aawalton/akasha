import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sagabarsOrders = {
  id: "01a0d5f4-c389-7a32-ac6d-26d31ce27883",
  type: "page-type/temper-lore-book",
  slug: "sagabars-orders",
  title: "Sagabar's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1970,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
