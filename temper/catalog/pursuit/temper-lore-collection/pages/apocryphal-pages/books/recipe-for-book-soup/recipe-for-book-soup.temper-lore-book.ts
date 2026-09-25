import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const recipeForBookSoup = {
  id: "01a0d60d-156e-7c88-9a87-a51aa341e877",
  type: "page-type/temper-lore-book",
  slug: "recipe-for-book-soup",
  title: "Recipe for Book Soup",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7769,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
