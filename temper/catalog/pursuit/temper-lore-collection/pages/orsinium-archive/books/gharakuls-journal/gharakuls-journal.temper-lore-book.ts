import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gharakulsJournal = {
  id: "01a0d5f7-160b-7389-83f0-1c13477d10c8",
  type: "page-type/temper-lore-book",
  slug: "gharakuls-journal",
  title: "Gharakul's Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3209,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
