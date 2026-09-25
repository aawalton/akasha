import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minahelsNote = {
  id: "01a0d60c-baf3-7d2d-bea0-3b0915b26148",
  type: "page-type/temper-lore-book",
  slug: "minahels-note",
  title: "Minahel's Note",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7304,
  bookIndex: 16,
  charted: true,
  quest: 6857,
  positions: "jsonl",
} as const satisfies TemperLoreBook
