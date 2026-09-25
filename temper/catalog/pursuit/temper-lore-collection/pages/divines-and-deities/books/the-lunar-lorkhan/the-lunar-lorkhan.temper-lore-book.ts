import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLunarLorkhan = {
  id: "01a0d5e3-944e-7ad7-8bdc-198e85440545",
  type: "page-type/temper-lore-book",
  slug: "the-lunar-lorkhan",
  title: "The Lunar Lorkhan",
  collection: "temper-lore-collection/divines-and-deities",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
