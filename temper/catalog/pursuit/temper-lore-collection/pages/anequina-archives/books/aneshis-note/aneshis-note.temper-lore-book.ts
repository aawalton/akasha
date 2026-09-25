import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aneshisNote = {
  id: "01a0d60b-2344-7287-a19c-1e30a9d3bd5a",
  type: "page-type/temper-lore-book",
  slug: "aneshis-note",
  title: "Aneshi's Note",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5431,
  bookIndex: 16,
  charted: true,
  quest: 6304,
  positions: "jsonl",
} as const satisfies TemperLoreBook
