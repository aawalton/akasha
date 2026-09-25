import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWhistle = {
  id: "01a0d5f6-d68c-7be9-a8c4-cbadebbf502d",
  type: "page-type/temper-lore-book",
  slug: "the-whistle",
  title: "The Whistle",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2753,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
