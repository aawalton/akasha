import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tajirrisJournal = {
  id: "01a0d60b-2345-700b-a8f1-3c895fca0858",
  type: "page-type/temper-lore-book",
  slug: "tajirris-journal",
  title: "Tajirri's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5459,
  bookIndex: 15,
  charted: true,
  quest: 6311,
  positions: "jsonl",
} as const satisfies TemperLoreBook
