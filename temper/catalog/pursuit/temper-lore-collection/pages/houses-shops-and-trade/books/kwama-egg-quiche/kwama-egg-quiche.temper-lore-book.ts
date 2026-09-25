import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kwamaEggQuiche = {
  id: "01a0d5f2-db26-7302-ba94-ea6039e82819",
  type: "page-type/temper-lore-book",
  slug: "kwama-egg-quiche",
  title: "Kwama Egg Quiche",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 610,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
