import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tinkererTobinsBigBookOfCraftingRecipes = {
  id: "01a0d5f4-6f1b-71a1-a32c-77b8ca1fbc43",
  type: "page-type/temper-lore-book",
  slug: "tinkerer-tobins-big-book-of-crafting-recipes",
  title: "Tinkerer Tobin's Big Book of Crafting Recipes",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2508,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
