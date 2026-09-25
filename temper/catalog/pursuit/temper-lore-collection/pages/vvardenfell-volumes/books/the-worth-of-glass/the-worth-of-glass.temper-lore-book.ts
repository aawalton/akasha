import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWorthOfGlass = {
  id: "01a0d5f7-aa9a-7309-8e93-445f2b4448f4",
  type: "page-type/temper-lore-book",
  slug: "the-worth-of-glass",
  title: "The Worth of Glass",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4522,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
