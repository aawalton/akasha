import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToSirQuatrius = {
  id: "01a0d5f4-3c12-7e2a-b06e-c377d7262480",
  type: "page-type/temper-lore-book",
  slug: "note-to-sir-quatrius",
  title: "Note to Sir Quatrius",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2033,
  bookIndex: 79,
  charted: true,
  quest: 2017,
  positions: "jsonl",
} as const satisfies TemperLoreBook
