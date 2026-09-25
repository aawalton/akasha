import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const smallMealsFastMeals = {
  id: "01a0d5f2-db26-7050-905d-e72070926d99",
  type: "page-type/temper-lore-book",
  slug: "small-meals-fast-meals",
  title: "Small Meals, Fast Meals",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 353,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
