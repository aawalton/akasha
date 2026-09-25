import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tajirrisNote = {
  id: "01a0d60b-2345-7fe7-a345-a0ee95908953",
  type: "page-type/temper-lore-book",
  slug: "tajirris-note",
  title: "Tajirri's Note",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5397,
  bookIndex: 13,
  charted: true,
  quest: 6311,
  positions: "jsonl",
} as const satisfies TemperLoreBook
