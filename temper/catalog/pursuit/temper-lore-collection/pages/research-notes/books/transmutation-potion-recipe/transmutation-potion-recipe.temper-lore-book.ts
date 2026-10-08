import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const transmutationPotionRecipe = {
  id: "01a0d5f5-1386-70fc-a85c-16e53fed9bd6",
  type: "page-type/temper-lore-book",
  slug: "transmutation-potion-recipe",
  title: "Transmutation Potion Recipe",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1463,
  bookIndex: 58,
  charted: true,
  quest: 4623,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:43.462Z",
  updatedAt: "2026-09-25T00:26:45.000Z",
} as const satisfies TemperLoreBook
