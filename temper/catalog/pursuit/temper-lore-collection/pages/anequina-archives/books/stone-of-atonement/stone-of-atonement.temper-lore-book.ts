import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stoneOfAtonement = {
  id: "01a0d60b-2345-7e48-b690-1e8c90793064",
  type: "page-type/temper-lore-book",
  slug: "stone-of-atonement",
  title: "Stone of Atonement",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5502,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
