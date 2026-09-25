import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendOfVastarie = {
  id: "01a0d5e4-d87c-7c31-a41c-b3ce9f763c40",
  type: "page-type/temper-lore-book",
  slug: "the-legend-of-vastarie",
  title: "The Legend of Vastarie",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
