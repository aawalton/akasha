import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anOdeToTheRedBird = {
  id: "01a0d5f6-1c15-7215-8e83-ba8462f1018d",
  type: "page-type/temper-lore-book",
  slug: "an-ode-to-the-red-bird",
  title: "An Ode to the Red Bird",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1761,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
