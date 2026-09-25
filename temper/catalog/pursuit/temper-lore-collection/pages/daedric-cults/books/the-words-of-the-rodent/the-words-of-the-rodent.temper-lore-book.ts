import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWordsOfTheRodent = {
  id: "01a0d5f2-253c-7005-86fa-61dc7c5b9c58",
  type: "page-type/temper-lore-book",
  slug: "the-words-of-the-rodent",
  title: "The Words of the Rodent",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 995,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
