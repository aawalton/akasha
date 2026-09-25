import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const knightsgraveLegendOrLegacy = {
  id: "01a0d5f7-73fa-7966-9ac5-6700f92dbee0",
  type: "page-type/temper-lore-book",
  slug: "knightsgrave-legend-or-legacy",
  title: "Knightsgrave: Legend or Legacy",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3678,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
