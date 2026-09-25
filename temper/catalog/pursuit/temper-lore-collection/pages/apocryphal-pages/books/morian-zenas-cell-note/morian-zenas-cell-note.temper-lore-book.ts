import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morianZenasCellNote = {
  id: "01a0d60d-156e-7554-a29c-fd2a8c5230e0",
  type: "page-type/temper-lore-book",
  slug: "morian-zenas-cell-note",
  title: "Morian Zenas Cell Note",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7619,
  bookIndex: 44,
  charted: true,
  quest: 6994,
  positions: "jsonl",
} as const satisfies TemperLoreBook
