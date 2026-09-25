import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPleaForHelp = {
  id: "01a0d5f6-d68a-7cc7-8bdb-5f6957dbef2d",
  type: "page-type/temper-lore-book",
  slug: "a-plea-for-help",
  title: "A Plea for Help",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3203,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
