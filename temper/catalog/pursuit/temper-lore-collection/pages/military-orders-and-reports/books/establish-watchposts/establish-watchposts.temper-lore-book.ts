import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const establishWatchposts = {
  id: "01a0d5f3-7052-7640-a7c9-e98c81e1050e",
  type: "page-type/temper-lore-book",
  slug: "establish-watchposts",
  title: "Establish Watchposts",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2238,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
