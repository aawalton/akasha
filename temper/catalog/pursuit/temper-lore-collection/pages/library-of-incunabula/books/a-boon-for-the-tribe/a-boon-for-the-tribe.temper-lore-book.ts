import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aBoonForTheTribe = {
  id: "01a0d5f8-02f7-7b03-8a54-51fe9d572fe3",
  type: "page-type/temper-lore-book",
  slug: "a-boon-for-the-tribe",
  title: "A Boon for the Tribe",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5046,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
