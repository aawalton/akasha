import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const codedRutter = {
  id: "01a0d5f4-07b7-7536-991d-36ea52320663",
  type: "page-type/temper-lore-book",
  slug: "coded-rutter",
  title: "Coded Rutter",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1988,
  bookIndex: 44,
  charted: true,
  quest: 4378,
  positions: "jsonl",
} as const satisfies TemperLoreBook
