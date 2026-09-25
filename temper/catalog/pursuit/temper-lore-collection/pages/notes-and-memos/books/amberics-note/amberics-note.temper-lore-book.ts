import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ambericsNote = {
  id: "01a0d5f4-3c11-7b2e-ab44-c8b329698759",
  type: "page-type/temper-lore-book",
  slug: "amberics-note",
  title: "Amberic's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2018,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
