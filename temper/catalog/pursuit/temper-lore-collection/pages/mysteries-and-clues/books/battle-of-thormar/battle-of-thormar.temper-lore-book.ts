import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const battleOfThormar = {
  id: "01a0d5f4-07b7-7da8-b71f-8ced355858fe",
  type: "page-type/temper-lore-book",
  slug: "battle-of-thormar",
  title: "Battle of Thormar",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1573,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
