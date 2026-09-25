import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dampPage = {
  id: "01a0d5f6-1c15-7303-b113-d3500d3eddc3",
  type: "page-type/temper-lore-book",
  slug: "damp-page",
  title: "Damp Page",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 329,
  bookIndex: 4,
  charted: true,
  quest: 4071,
  positions: "jsonl",
} as const satisfies TemperLoreBook
