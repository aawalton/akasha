import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sealedOrdersOpened = {
  id: "01a0d5f3-7054-7e6c-bd51-eb95ea675819",
  type: "page-type/temper-lore-book",
  slug: "sealed-orders-opened",
  title: "Sealed Orders (opened)",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 857,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
