import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sheIsMyLight = {
  id: "01a0d5f2-af70-78b1-af3f-67049e41c40e",
  type: "page-type/temper-lore-book",
  slug: "she-is-my-light",
  title: "She Is My Light",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2553,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
