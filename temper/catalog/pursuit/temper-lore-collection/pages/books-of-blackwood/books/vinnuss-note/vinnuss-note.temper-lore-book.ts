import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vinnussNote = {
  id: "01a0d60b-fdb1-77fc-8c39-7d2592c0bec1",
  type: "page-type/temper-lore-book",
  slug: "vinnuss-note",
  title: "Vinnus's Note",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6672,
  bookIndex: 89,
  charted: true,
  quest: 6663,
  positions: "jsonl",
} as const satisfies TemperLoreBook
