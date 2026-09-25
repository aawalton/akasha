import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seafoodSupper = {
  id: "01a0d5f2-db26-7c8a-8e01-50b55925facd",
  type: "page-type/temper-lore-book",
  slug: "seafood-supper",
  title: "Seafood Supper",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1363,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
