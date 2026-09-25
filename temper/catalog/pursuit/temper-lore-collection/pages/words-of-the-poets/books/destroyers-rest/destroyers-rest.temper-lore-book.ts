import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const destroyersRest = {
  id: "01a0d5f6-1c15-7185-b6af-c26459544175",
  type: "page-type/temper-lore-book",
  slug: "destroyers-rest",
  title: "Destroyer's Rest",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1816,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
