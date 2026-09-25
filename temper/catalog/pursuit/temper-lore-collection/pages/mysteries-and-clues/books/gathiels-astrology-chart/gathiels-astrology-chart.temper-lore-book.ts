import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gathielsAstrologyChart = {
  id: "01a0d5f4-07b7-7a75-b71e-23f02a90ce90",
  type: "page-type/temper-lore-book",
  slug: "gathiels-astrology-chart",
  title: "Gathiel's Astrology Chart",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1779,
  bookIndex: 41,
  charted: true,
  quest: 4815,
  positions: "jsonl",
} as const satisfies TemperLoreBook
