import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vathirasNote = {
  id: "01a0d5f4-3c13-7a24-86fd-a79fab550e8d",
  type: "page-type/temper-lore-book",
  slug: "vathiras-note",
  title: "Vath'ira's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 299,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
