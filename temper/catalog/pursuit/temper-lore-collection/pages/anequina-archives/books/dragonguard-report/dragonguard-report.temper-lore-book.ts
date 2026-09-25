import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragonguardReport = {
  id: "01a0d60b-2344-78f7-9ded-1bf5c6818e56",
  type: "page-type/temper-lore-book",
  slug: "dragonguard-report",
  title: "Dragonguard Report",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5379,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
