import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToPeryite = {
  id: "01a0d60b-2345-78a2-9051-24b8a736ab9b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-peryite",
  title: "Letter to Peryite",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5468,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
