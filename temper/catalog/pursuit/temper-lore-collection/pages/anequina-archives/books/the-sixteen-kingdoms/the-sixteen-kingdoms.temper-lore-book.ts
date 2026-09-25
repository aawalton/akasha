import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSixteenKingdoms = {
  id: "01a0d60b-2346-78da-957d-e77135ca37d8",
  type: "page-type/temper-lore-book",
  slug: "the-sixteen-kingdoms",
  title: "The Sixteen Kingdoms",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5506,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
