import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eldbjorgsNeededIngredients = {
  id: "01a0d5f4-07b7-74db-9811-d62744e65254",
  type: "page-type/temper-lore-book",
  slug: "eldbjorgs-needed-ingredients",
  title: "Eldbjorg's Needed Ingredients",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2536,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
