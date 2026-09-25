import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersToHalskar = {
  id: "01a0d5f3-7053-7083-8e72-fec435750370",
  type: "page-type/temper-lore-book",
  slug: "orders-to-halskar",
  title: "Orders to Halskar",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 458,
  bookIndex: 17,
  charted: true,
  quest: 4062,
  positions: "jsonl",
} as const satisfies TemperLoreBook
