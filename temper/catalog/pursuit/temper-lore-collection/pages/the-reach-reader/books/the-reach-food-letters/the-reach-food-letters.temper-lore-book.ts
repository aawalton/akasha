import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theReachFoodLetters = {
  id: "01a0d60b-c958-753c-98d4-c596d4b5b7f7",
  type: "page-type/temper-lore-book",
  slug: "the-reach-food-letters",
  title: "The Reach Food Letters",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6308,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
