import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dulkhisDiary = {
  id: "01a0d5f2-af6f-71d1-bdc9-2b30861924d2",
  type: "page-type/temper-lore-book",
  slug: "dulkhis-diary",
  title: "Dulkhi's Diary",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2151,
  bookIndex: 64,
  charted: true,
  quest: 5027,
  positions: "jsonl",
} as const satisfies TemperLoreBook
