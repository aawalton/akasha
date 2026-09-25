import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const panickedNote = {
  id: "01a0d60e-45b3-7ffe-be66-91dd8649aac5",
  type: "page-type/temper-lore-book",
  slug: "panicked-note",
  title: "Panicked Note",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8613,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
