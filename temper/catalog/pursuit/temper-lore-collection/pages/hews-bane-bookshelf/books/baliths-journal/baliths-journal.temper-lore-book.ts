import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const balithsJournal = {
  id: "01a0d5f7-4293-7a4e-8d12-3d76a031263b",
  type: "page-type/temper-lore-book",
  slug: "baliths-journal",
  title: "Balith's Journal",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3427,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
