import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTonenakaShrine = {
  id: "01a0d60b-2346-7343-a375-aea6b72cd5fc",
  type: "page-type/temper-lore-book",
  slug: "the-tonenaka-shrine",
  title: "The Tonenaka Shrine",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5608,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
