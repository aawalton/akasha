import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noFussNoRush = {
  id: "01a0d5f7-4294-7905-95fd-5dc4ce3874a9",
  type: "page-type/temper-lore-book",
  slug: "no-fuss-no-rush",
  title: "No Fuss, No Rush",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3433,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
