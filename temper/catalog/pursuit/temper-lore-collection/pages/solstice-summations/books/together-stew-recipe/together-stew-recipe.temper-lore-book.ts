import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const togetherStewRecipe = {
  id: "01a0d60d-ff6a-7296-a877-17cbaba44f23",
  type: "page-type/temper-lore-book",
  slug: "together-stew-recipe",
  title: "Together Stew Recipe",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8308,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
