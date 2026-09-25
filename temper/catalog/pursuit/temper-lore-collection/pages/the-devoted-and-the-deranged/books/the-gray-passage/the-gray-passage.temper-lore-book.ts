import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGrayPassage = {
  id: "01a0d5f5-abbb-73f1-8f3d-7adc72a12bdf",
  type: "page-type/temper-lore-book",
  slug: "the-gray-passage",
  title: "The Gray Passage",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2726,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
