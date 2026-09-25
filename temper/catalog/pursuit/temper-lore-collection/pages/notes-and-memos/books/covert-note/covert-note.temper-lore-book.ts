import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const covertNote = {
  id: "01a0d5f4-3c11-7e25-aac8-e19877b8ce10",
  type: "page-type/temper-lore-book",
  slug: "covert-note",
  title: "Covert Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 943,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
