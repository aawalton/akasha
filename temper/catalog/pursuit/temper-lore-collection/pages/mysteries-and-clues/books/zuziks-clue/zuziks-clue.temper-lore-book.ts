import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zuziksClue = {
  id: "01a0d5f4-07ba-7c58-8eb0-b37daec297f3",
  type: "page-type/temper-lore-book",
  slug: "zuziks-clue",
  title: "Zuzik's Clue",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2454,
  bookIndex: 70,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
