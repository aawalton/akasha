import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitSummerset = {
  id: "01a0d60a-d5be-7394-9903-0923c5f5a2b9",
  type: "page-type/temper-lore-book",
  slug: "visit-summerset",
  title: "Visit Summerset",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5085,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
