import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const restGently = {
  id: "01a0d5f6-45ae-7e6e-81cc-53bffd493f8e",
  type: "page-type/temper-lore-book",
  slug: "rest-gently",
  title: "Rest Gently",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1323,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
