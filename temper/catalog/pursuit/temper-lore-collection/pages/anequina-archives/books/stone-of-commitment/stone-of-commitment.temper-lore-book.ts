import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stoneOfCommitment = {
  id: "01a0d60b-2345-7b3e-af26-a376e9ef68f8",
  type: "page-type/temper-lore-book",
  slug: "stone-of-commitment",
  title: "Stone of Commitment",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5501,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
