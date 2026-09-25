import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stonemeltPotionRecipe = {
  id: "01a0d60b-a362-75c3-973e-24225b4bfb99",
  type: "page-type/temper-lore-book",
  slug: "stonemelt-potion-recipe",
  title: "Stonemelt Potion Recipe",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 5924,
  bookIndex: 1,
  charted: true,
  quest: 6484,
  positions: "jsonl",
} as const satisfies TemperLoreBook
