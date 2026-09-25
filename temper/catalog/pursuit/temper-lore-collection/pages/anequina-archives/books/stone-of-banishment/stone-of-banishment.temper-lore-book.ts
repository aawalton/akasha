import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stoneOfBanishment = {
  id: "01a0d60b-2345-7d55-9e39-5bc81011e2d6",
  type: "page-type/temper-lore-book",
  slug: "stone-of-banishment",
  title: "Stone of Banishment",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5503,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
