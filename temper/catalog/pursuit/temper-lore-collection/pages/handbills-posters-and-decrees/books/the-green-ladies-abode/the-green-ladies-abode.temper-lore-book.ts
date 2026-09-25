import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreenLadiesAbode = {
  id: "01a0d5f2-83a3-7e53-9e7d-5af6521328da",
  type: "page-type/temper-lore-book",
  slug: "the-green-ladies-abode",
  title: "The Green Ladies' Abode",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 777,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
