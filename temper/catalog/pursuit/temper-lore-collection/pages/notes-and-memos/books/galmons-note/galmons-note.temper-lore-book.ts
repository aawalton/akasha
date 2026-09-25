import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galmonsNote = {
  id: "01a0d5f4-3c11-7f02-82cb-0027e00caf0c",
  type: "page-type/temper-lore-book",
  slug: "galmons-note",
  title: "Galmon's Note",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 568,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
