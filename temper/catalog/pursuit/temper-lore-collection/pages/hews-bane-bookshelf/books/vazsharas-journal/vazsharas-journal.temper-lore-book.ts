import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vazsharasJournal = {
  id: "01a0d5f7-4294-79e0-ad3e-4f865f9ec3a4",
  type: "page-type/temper-lore-book",
  slug: "vazsharas-journal",
  title: "Vazshara's Journal",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3331,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
