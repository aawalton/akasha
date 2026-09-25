import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const truthsOfTheNorth = {
  id: "01a0d5f6-1c16-77aa-9bbc-9bf4f57d9e20",
  type: "page-type/temper-lore-book",
  slug: "truths-of-the-north",
  title: "Truths of the North",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 326,
  bookIndex: 2,
  charted: true,
  quest: 4071,
  positions: "jsonl",
} as const satisfies TemperLoreBook
