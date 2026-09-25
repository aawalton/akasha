import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const recipeForHorkerPie = {
  id: "01a0d5f2-db26-7dc6-b12e-19d29df4a50e",
  type: "page-type/temper-lore-book",
  slug: "recipe-for-horker-pie",
  title: "Recipe for Horker Pie",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1883,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
