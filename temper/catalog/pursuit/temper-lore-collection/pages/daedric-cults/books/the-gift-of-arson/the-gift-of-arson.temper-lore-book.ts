import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGiftOfArson = {
  id: "01a0d5f2-253b-7351-8766-a4bc38615b3c",
  type: "page-type/temper-lore-book",
  slug: "the-gift-of-arson",
  title: "The Gift of Arson",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 961,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
