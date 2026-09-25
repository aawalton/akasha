import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voljarsMeaderyRecipes = {
  id: "01a0d5f2-db27-70df-9d97-e43569d3da42",
  type: "page-type/temper-lore-book",
  slug: "voljars-meadery-recipes",
  title: "Voljar's Meadery Recipes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 380,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
