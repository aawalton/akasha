import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theThousandArrows = {
  id: "01a0d5f3-3fdc-7d73-8d6d-977826f711f6",
  type: "page-type/temper-lore-book",
  slug: "the-thousand-arrows",
  title: "The Thousand Arrows",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1112,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
