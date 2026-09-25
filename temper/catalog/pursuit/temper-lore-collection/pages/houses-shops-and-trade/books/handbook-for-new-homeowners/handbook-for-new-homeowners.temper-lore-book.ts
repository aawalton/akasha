import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const handbookForNewHomeowners = {
  id: "01a0d5f2-db26-7513-b99b-3bc838f66eda",
  type: "page-type/temper-lore-book",
  slug: "handbook-for-new-homeowners",
  title: "Handbook for New Homeowners",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 8237,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
