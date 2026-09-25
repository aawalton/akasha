import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const felgolsNote = {
  id: "01a0d5f6-45ad-71f2-8eba-ab7fe27111b2",
  type: "page-type/temper-lore-book",
  slug: "felgols-note",
  title: "Felgol's Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2762,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
