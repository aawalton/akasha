import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sapiarchsRecommendation = {
  id: "01a0d60a-d5bd-715e-90b9-bf7ab31fc14e",
  type: "page-type/temper-lore-book",
  slug: "sapiarchs-recommendation",
  title: "Sapiarch's Recommendation",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5066,
  bookIndex: 47,
  charted: true,
  quest: 6141,
  positions: "jsonl",
} as const satisfies TemperLoreBook
