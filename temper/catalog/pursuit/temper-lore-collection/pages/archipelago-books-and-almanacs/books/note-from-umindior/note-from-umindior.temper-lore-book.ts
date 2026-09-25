import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromUmindior = {
  id: "01a0d60c-baf3-7732-81c0-50c9ace897e5",
  type: "page-type/temper-lore-book",
  slug: "note-from-umindior",
  title: "Note from Umindior",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7311,
  bookIndex: 17,
  charted: true,
  quest: 6857,
  positions: "jsonl",
} as const satisfies TemperLoreBook
