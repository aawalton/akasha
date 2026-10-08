import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aNewRecipe = {
  id: "01a0d5f6-6d3f-7f31-b1bf-a5ed90dd0d7b",
  type: "page-type/temper-lore-book",
  slug: "a-new-recipe",
  title: "A New Recipe?",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 399,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:11.967Z",
  updatedAt: "2026-09-25T00:28:13.000Z",
} as const satisfies TemperLoreBook
