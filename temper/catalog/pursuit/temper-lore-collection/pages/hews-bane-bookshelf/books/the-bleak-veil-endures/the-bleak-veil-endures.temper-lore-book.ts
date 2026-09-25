import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBleakVeilEndures = {
  id: "01a0d5f7-4294-7815-9713-4eee5016b9e0",
  type: "page-type/temper-lore-book",
  slug: "the-bleak-veil-endures",
  title: "The Bleak Veil Endures",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3412,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
