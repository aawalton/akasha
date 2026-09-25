import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendOfThukhozod = {
  id: "01a0d5f6-d68c-70f8-a2d4-2e0117b7d60f",
  type: "page-type/temper-lore-book",
  slug: "the-legend-of-thukhozod",
  title: "The Legend of Thukhozod",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3012,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
