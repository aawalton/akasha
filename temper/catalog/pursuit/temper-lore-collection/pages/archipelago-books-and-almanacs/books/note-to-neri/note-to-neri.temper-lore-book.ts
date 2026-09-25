import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToNeri = {
  id: "01a0d60c-baf3-72f1-9fef-306ae8b58454",
  type: "page-type/temper-lore-book",
  slug: "note-to-neri",
  title: "Note to Neri",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7301,
  bookIndex: 14,
  charted: true,
  quest: 6857,
  positions: "jsonl",
} as const satisfies TemperLoreBook
