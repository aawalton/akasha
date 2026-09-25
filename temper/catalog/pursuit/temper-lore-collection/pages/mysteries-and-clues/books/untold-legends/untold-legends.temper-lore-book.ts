import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const untoldLegends = {
  id: "01a0d5f4-07b9-76d1-a6ad-e58ed3f795f6",
  type: "page-type/temper-lore-book",
  slug: "untold-legends",
  title: "Untold Legends",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1371,
  bookIndex: 34,
  charted: true,
  quest: 3916,
  positions: "jsonl",
} as const satisfies TemperLoreBook
