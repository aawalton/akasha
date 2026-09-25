import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const faithInDustAndStone = {
  id: "01a0d60b-2344-7cfc-bede-984d6bce1dd0",
  type: "page-type/temper-lore-book",
  slug: "faith-in-dust-and-stone",
  title: "Faith in Dust and Stone",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5490,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
