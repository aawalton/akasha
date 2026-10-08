import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToNathyn = {
  id: "01a0d60c-eb9c-744d-a096-d838701c5afb",
  type: "page-type/temper-lore-book",
  slug: "note-to-nathyn",
  title: "Note to Nathyn",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7569,
  bookIndex: 46,
  charted: true,
  quest: 6999,
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:46.108Z",
  updatedAt: "2026-09-25T00:52:48.000Z",
} as const satisfies TemperLoreBook
