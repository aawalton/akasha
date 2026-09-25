import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const donolonBakes = {
  id: "01a0d5f2-db26-7434-99aa-1c66d21a6b11",
  type: "page-type/temper-lore-book",
  slug: "donolon-bakes",
  title: "Donolon Bakes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 3495,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
