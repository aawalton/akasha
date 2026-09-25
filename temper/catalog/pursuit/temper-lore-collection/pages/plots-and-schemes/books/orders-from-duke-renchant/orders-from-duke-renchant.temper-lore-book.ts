import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromDukeRenchant = {
  id: "01a0d5f4-c388-7ed4-b6ba-76e81384ca9c",
  type: "page-type/temper-lore-book",
  slug: "orders-from-duke-renchant",
  title: "Orders from Duke Renchant",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1843,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
