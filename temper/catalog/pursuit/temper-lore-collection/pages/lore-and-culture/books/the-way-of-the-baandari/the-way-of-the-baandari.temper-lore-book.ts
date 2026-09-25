import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWayOfTheBaandari = {
  id: "01a0d5f3-3fdc-7bdf-8cb1-bfb4ee56722b",
  type: "page-type/temper-lore-book",
  slug: "the-way-of-the-baandari",
  title: "The Way of the Baandari",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1075,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
